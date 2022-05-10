'use strict'

const { parse } = require('path')
const kebabCase = require('lodash/kebabCase')

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce container element to have Vue component name as a CSS class',
      url: 'https://docs.google.com/document/d/1TDnCLixJKGAEIcW2V8prlHDIqrh8UVh-d0bwXOIXX3Q/edit#heading=h.sebee884qnl1'
    },
    hasSuggestions: true,
    messages: {
      missing: 'root element should have \'{{name}}\' class',
      add: 'add \'{{name}}\' to the class list'
    },
    schema: [
      {
        type: "array",
        items: {
          type: "string"
        }
      }
    ]
  },

  create (context) {
    // ----------------------------------------------------------------------
    // Helpers
    // ----------------------------------------------------------------------

    function findRootElement (element) {
      const children = element?.children
      if (!children) return null

      const wrapperComponentNames = [
        ...context.options[0].map(kebabCase),
        'template'
      ]

      for (const node of children) {
        if (node.type !== 'VElement') {
          continue
        }

        if (wrapperComponentNames.includes(kebabCase(node.rawName))) {
          return findRootElement(node)
        } else {
          return node
        }
      }

      // render() methods are not supported
      return null
    }

    function getDefaultExport (program) {
      return program.body?.find(node => node.type === 'ExportDefaultDeclaration')?.declaration
    }

    function getElementClasses (element) {
      const classes = new Set()

      element.startTag.attributes.forEach((attribute) => {
        if (attribute.key.name === 'class') {
          // A vanilla class attribute
          if (attribute.value.type !== 'VLiteral') {
            throw new Error('Expecting "class" values to be literals')
          }
          attribute.value.value
            .split(/\s+/g)
            .forEach(classes.add, classes)
        } else if (
          // Bound class information
          attribute.key.type === 'VDirectiveKey' &&
          attribute.key.argument &&
          attribute.key.argument.type === 'VIdentifier' &&
          attribute.key.argument.name === 'class'
        ) {
          if (
            attribute.value.type === 'VExpressionContainer' &&
            attribute.value.expression.type === 'ArrayExpression' // ignores ObjectExpressions
          ) {
            attribute.value.expression.elements.forEach((node) => {
              if (node.type === 'Literal') {
                classes.add(node.value)
              }
            })
          }
        }
      })

      return classes
    }

    function getComponentName (declaration) {
      // Classic Vue2
      if (declaration.type === 'ObjectExpression') {
        for (const { key: { name }, value: { value } } of declaration.properties) {
          if (name === 'name') {
            return value
          }
        }
      }

      // Exporting named variable
      if (declaration.type === 'Identifier') {
        return declaration.name
      }

      return null
    }

    function getFilenameFromPath (path) {
      return parse(path)?.name
    }

    function findComponentName (program) {
      const exportDeclaration = getDefaultExport(program)
      if (exportDeclaration) {
        return getComponentName(exportDeclaration)
      } else {
        return getFilenameFromPath(context.getFilename())
      }
    }

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return {
      Program (program) {
        const root = findRootElement(program?.templateBody)

        // No template
        if (!root) return

        const componentName = findComponentName(program)
        const expectedClass = kebabCase(componentName)

        if (!expectedClass) {
          context.report({
            node: root,
            messageId: 'missing'
          })
        }

        const classes = getElementClasses(root)

        if (!classes.has(expectedClass)) {
          context.report({
            node: root.startTag,
            messageId: 'missing',
            data: {
              name: expectedClass
            },
            suggest: [{
              messageId: 'add',
              data: {
                name: expectedClass
              },
              fix: function (fixer) {
                for (const attribute of root.startTag.attributes) {
                  if (attribute.key.name === 'class') {
                    const [from, to] = attribute.value.range
                    return fixer.insertTextBeforeRange([from + 1, to], `${expectedClass} `)
                  }
                }

                const [from, to] = root.startTag.range
                return fixer.insertTextAfterRange([from, to - 1], ` class="${expectedClass}"`)
              }
            }]
          })
        }
      }
    }
  }
}
