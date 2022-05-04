function generateConfigs (projectName, ruleSets) {
  return Object.entries(ruleSets)
    .reduce((acc, [category, rules]) => {
      acc[category] = {
        plugins: [projectName],
        rules: Object.fromEntries(
          Object.keys(rules)
            .map(key => [`${projectName}/${key}`, 'warn'])
        )
      }
      return acc
    }, {})
}

function generateRules (ruleSets) {
  return Object.values(ruleSets).reduce((rules, ruleSet) => ({
    ...rules,
    ...ruleSet
  }), {})
}

/**
 * Generate ESLint plugin module from a hierarchy of rules
 *
 * @param projectName will become a rule prefix
 * @param ruleSets rules by category
 * @returns {Object}
 */
module.exports = function generatePlugin (projectName, ruleSets) {
  return {
    configs: generateConfigs(projectName, ruleSets),
    rules: generateRules(ruleSets)
  }
}
