/**
 * Proxy for lodash to minimize imported modules
 * Usage: 'import * as _ from './util/lodash'
 */

// imports
import head from 'lodash/head'
import each from 'lodash/each'
import extend from 'lodash/extend'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import get from 'lodash/get'
import has from 'lodash/has'
import includes from 'lodash/includes'
import isArray from 'lodash/isArray'
import isDate from 'lodash/isDate'
import isEmpty from 'lodash/isEmpty'
import isNull from 'lodash/isNull'
import isError from 'lodash/isError'
import isFunction from 'lodash/isFunction'
import isNumber from 'lodash/isNumber'
import isObject from 'lodash/isObject'
import isUndefined from 'lodash/isUndefined'
import join from 'lodash/join'
import keyBy from 'lodash/keyBy'
import keys from 'lodash/keys'
import pullAt from 'lodash/pullAt'
import map from 'lodash/map'
import merge from 'lodash/merge'
import set from 'lodash/set'
import unset from 'lodash/unset'
import values from 'lodash/values'

// exports
export {
  head, keys, values, has, get, set, unset, extend, merge, keyBy, pullAt,
  isError, isFunction, isObject, isArray, isNumber, isDate, isEmpty, isUndefined, isNull,
  join, map, find, findIndex, includes, each
}
