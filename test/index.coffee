bricktag = require('../src/index.coffee')
assert = require('component-assert')

describe 'bricktag.load', ->
  it 'should initiate bricktag', ()->
    bricktag.Advertising.load(228)
