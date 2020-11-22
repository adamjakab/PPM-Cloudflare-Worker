/**
 * Proxy for lodash to minimize imported modules
 * Usage: 'import * as _ from './util/lodash'
 */

// imports
import each from 'lodash/each'
import extend from 'lodash/extend'
import find from 'lodash/find'
import get from 'lodash/get'
import has from 'lodash/has'
import includes from 'lodash/includes'
import isArray from 'lodash/isArray'
import isDate from 'lodash/isDate'
import isEmpty from 'lodash/isEmpty'
import isFunction from 'lodash/isFunction'
import isNumber from 'lodash/isNumber'
import isObject from 'lodash/isObject'
import isUndefined from 'lodash/isUndefined'
import join from 'lodash/join'
import keys from 'lodash/keys'
import map from 'lodash/map'
import set from 'lodash/set'
import unset from 'lodash/unset'
import values from 'lodash/values'

// exports
export {
  keys, values, has, get, set, unset, extend,
  isFunction, isObject, isArray, isNumber, isDate, isEmpty, isUndefined,
  join, map, find, includes, each
}
