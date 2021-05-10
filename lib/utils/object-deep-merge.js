'use strict'

/**
 * This function will perform a deep merge of objectB over objectA.
 * 
 * @param {Object} objectA 
 * @param {Object} objectB 
 */
function objectDeepMerge (objectA, objectB) {

    const result = { ...objectA }

    for (const [key, value] of Object.entries(objectB)) {
        if (Array.isArray(value)) { // overwrite arrays entirely
            result[key] = value
        } else if (typeof value === 'object') { // recurse objects
                result[key] = objectDeepMerge(result[key], value)
        } else {
            result[key] = value
        }
    }
    
    return result
}

module.exports = objectDeepMerge