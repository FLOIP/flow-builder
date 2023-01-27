import {SimpleStack} from '@/store/undo/SimpleStack'

describe('SimpleStack', () => {
  it('should initialize correctly', () => {
    const stack = new SimpleStack()
    expect(stack.tooltip()).toBe(undefined)
    expect(stack.isEmpty()).toBe(true)
    expect(stack.pop()).toBe(undefined)
  })

  it('should push & pop correctly', () => {
    const stack = new SimpleStack<any>()

    const items = [
      {
        name: 'Argentina',
        capital: 'Buenos Aires',
        independence: new Date(1816, 6, 9),
        unasur: true,
      },
      {
        name: 'Republica Argentina',
        population: '41324992',
        independence: new Date(1816, 6, 9),
        unasur: true,
      },
    ]

    stack.push({snapshot: items[0], name: 'initial'})
    stack.push({snapshot: items[1], name: 'rename, add population, remove capital'})

    expect(stack.pop()).toEqual({snapshot: items[1], name: 'rename, add population, remove capital'})
    expect(stack.pop()).toEqual({snapshot: items[0], name: 'initial'})
  })
})
