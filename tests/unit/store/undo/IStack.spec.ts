import SimpleStack from '@/store/undo/SimpleStack'
import {IStack} from '@/store/undo/IStack'
import DiffBasedStack from '@/store/undo/DiffBasedStack'

const items = Object.freeze([
  {
    name: 'Argentina',
    capital: 'Buenos Aires',
    independence: new Date(1816, 6, 9),
  },
  {
    name: 'Republica Argentina',
    population: '41324992',
    independence: new Date(1816, 6, 9),
  },
])

describe.each<IStack<unknown>>([
  new SimpleStack(),
  new DiffBasedStack(),
])('IStack implementation', stack => {
  const stackName = stack.constructor.name
  it(`${stackName} should initialize correctly`, () => {
    expect(stack.tooltip()).toBe(undefined)
    expect(stack.isEmpty()).toBe(true)
    expect(stack.pop()).toBe(undefined)
  })

  it(`${stackName}.push() should work`, () => {
    stack.push({value: items[0], name: 'initial'})
    expect(stack.tooltip()).toBe('initial')
    expect(stack.isEmpty()).toBe(false)

    stack.push({value: items[1], name: 'modify'})
    expect(stack.tooltip()).toBe('modify')
    expect(stack.isEmpty()).toBe(false)
  })

  it(`${stackName}.pop() should work`, () => {
    expect(stack.pop()).toEqual({value: items[1], name: 'modify'})
    expect(stack.pop()).toEqual({value: items[0], name: 'initial'})
  })

  it(`${stackName}.clear() should work`, () => {
    stack.push({value: items[0], name: 'initial'})
    stack.push({value: items[1], name: 'modify'})
    stack.clear()
    expect(stack.tooltip()).toBe(undefined)
    expect(stack.isEmpty()).toBe(true)
    expect(stack.pop()).toBe(undefined)
  })
})
