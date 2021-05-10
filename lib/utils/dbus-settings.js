'use strict'

const dbus = require('dbus-next')

/** 
 * This function takes an object of dbus settings and converts the values
 * to their respective dbus variants.
 * 
 * It throws an TypeError if the `dbusSettings` object contains an invalid key.
 * 
 * @param {Object} dbusSettings 
 * @returns {Object} masked dbus settings
 */
function maskDbusSettings(dbusSettings) {
    return __maskDbusSettings(dbusSettings)
}

/**
 * This function takes an object of dbus settings and converts the values
 * to their respective dbus variants using the `variantTypes` object as
 * a reference to map values to their types.
 * 
 * `variantTypes` is optional and does not need to be set. The parameter is
 * only used to support the recursive nature of this function.
 * 
 * This function is only for internal use by this module. For productive use,
 * there is a wrapper function `maskDbusSettings()` which only exposes the
 * `dbusSettings` parameter.
 * 
 * @param {Object} dbusSettings 
 * @param {Object} variantTypes 
 * @returns 
 */
function __maskDbusSettings(dbusSettings, variantTypes = dbusSettingsVariantTypes) {
    
    const result = { ...dbusSettings }

    for (const [key, value] of Object.entries(result)) {
        if (key in variantTypes) {
            if (typeof value === 'object' && !Buffer.isBuffer(value)) { // recurse objects
                result[key] = __maskDbusSettings(result[key], variantTypes[key])
            } else {
                result[key] = new dbus.Variant(variantTypes[key], value)
            }
        } else {
            throw new TypeError('`' + key + '` is not a valid dbus setting')

        }
    }
    
    return result
}

/**
 * This function will perform a deep merge of objectB over objectA,
 * while applying the rules of the dbus setting object structure.
 * 
 * @param {Object} objectA 
 * @param {Object} objectB 
 */
function mergeDbusSettings (objectA, objectB) {

    const result = { ...objectA }

    for (const [key, value] of Object.entries(objectB)) {
        if (Array.isArray(value)) { // overwrite arrays entirely
            result[key] = value
        } else if (typeof value === 'object') { // recurse objects
                result[key] = mergeDbusSettings(result[key], value)
        } else {
            result[key] = value
        }
    }
    
    return result
}

// sources:
//   * https://developer.gnome.org/NetworkManager/stable/nm-settings-dbus.html

// Note: for now this object only contains the types we need for nm-dbus.

const dbusSettingsVariantTypes = {
    'bluetooth': {
        'bdaddr': 'ay',
        'type': 's'
    },
    'connection': {
        'auth-retries': 'i',
        'autoconnect': 'b',
        'autoconnect-priority': 'i',
        'autoconnect-retries': 'i',
        'autoconnect-slaves': 'i',
        'gateway-ping-timeout': 'i',
        'id': 's',
        'interface-name': 's',
        'lldp': 'i',
        'llmr': 'i',
        'master': 's',
        'mdns': 'i',
        'metered': 'i',
        'mud-url': 's',
        'multi-connect': 'i',
        'permissions': 'as',
        'read-only': 'b',
        'secondaries': 'as',
        'slave-type': 's',
        'stable-id': 's',
        'timestamp': 't',
        'type': 's',
        'uuid': 's',
        'wait-device-timeout': 'i',
        'zone': 's'
    },
    '802-11-wireless': {
        'ap-isolation': 'i',
        'assigned-mac-address': 's',
        'band': 's',
        'bssid': 'ay',
        'channel': 'u',
        'cloned-mac-address': 'ay',
        'generate-mac-address-mask': 's',
        'hidden': 'b',
        'mac-address': 'ay',
        'mac-address-blacklist': 'as',
        'mac-address-randomization': 'u',
        'mode': 's',
        'mtu': 'u',
        'powersave': 'u',
        'rate': 'u',
        'seen-bssids': 'as',
        'ssid': 'ay',
        'tx-power': 'u',
        'wake-on-lan': 'u'
    },
    '802-11-wireless-security': {
        'auth-alg': 's',
        'fils': 'i',
        'group': 'as',
        'key-mgmt': 's',
        'leap-password': 's',
        'leap-password-flags': 'u',
        'pairwise': 'as',
        'pmf': 'i',
        'proto': 'as',
        'psk': 's',
        'psk-flags': 'u',
        'wep-key-flags': 'u',
        'wep-key-type': 'u',
        'wep-key0': 's',
        'wep-key1': 's',
        'wep-key2': 's',
        'wep-key3': 's',
        'wep-tx-keyidx': 'u',
        'wps-method': 'u'
    },
    'ipv4': {
        'address-data': 'ay', // see [1] below
        'addresses': 'aau',
        'dad-timeout': 'i',
        'dhcp-client-id': 's',
        'dhcp-fqdn': 's',
        'dhcp-hostname': 's',
        'dhcp-hostname-flags': 'u',
        'dhcp-iaid': 's',
        'dhcp-reject-servers': 'as',
        'dhcp-send-hostname': 'b',
        'dhcp-timeout': 'i',
        'dhcp-vendor-class-identifier': 's',
        'dns': 'au',
        'dns-options': 'as',
        'dns-priority': 'i',
        'dns-search': 'as',
        'gateway': 's',
        'ignore-auto-dns': 'b',
        'ignore-auto-routes': 'b',
        'may-fail': 'b',
        'method': 's',
        'never-default': 'b',
        'route-data': 'ay', // see [1] below
        'route-metric': 'x',
        'route-table': 'u',
        'routes': 'aau'
    },
    'ipv6': {
        'addr-gen-mode': 'i',
        'address-data': 'ay', // see [1] below
        'addresses': 'a(ayuay)',
        'dad-timeout': 'i',
        'dhcp-duid': 's',
        'dhcp-hostname': 's',
        'dhcp-hostname-flags': 'u',
        'dhcp-iaid': 's',
        'dhcp-reject-servers': 'as',
        'dhcp-send-hostname': 'b',
        'dhcp-timeout': 'i',
        'dns': 'aay',
        'dns-options': 'as',
        'dns-priority': 'i',
        'dns-search': 'as',
        'gateway': 's',
        'ignore-auto-dns': 'b',
        'ignore-auto-routes': 'b',
        'ip6-privacy': 'i',
        'may-fail': 'b',
        'method': 's',
        'never-default': 'b',
        'ra-timeout': 'i',
        'route-data': 'ay', // see [1] below
        'route-metric': 'x',
        'route-table': 'u',
        'routes': 'a(ayuayu)',
        'token': 's'
    }

    // [1]: the NetworkManager docs say that the type of those values is "array of vardict" but
    //      there's no information at all what this means in terms of dbus settings variants.
    //      Even worse: there's no information on the whole f*ing internet what the word
    //      "vardict" means in this context. If someone of the NetworkManager people reads this:
    //      YOU WRITE THE WORST POSSIBLE DOCS I COULD HAVE EVER IMAGINED. I WASTED TOO MUCH
    //      TIME OF MY LIFE ON YOUR BS! WHY DO YOU DO THIS TO THE WORLD??
    //      However: to get somewhere with this, I interpreted it as byte array. Might be
    //      wrong, might be right - we will see.
    // TODO: Find out what "array of vardict" means.
}

module.exports = { mergeDbusSettings, maskDbusSettings, dbusSettingsVariantTypes } 
