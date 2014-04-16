'use strict';

/**
 * http://www.w3.org/TR/xpath-functions/#constructor-functions-for-xsd-types
 */
exports.getSchemaBuiltinTypes = function(){
    var ns = 'http://www.w3.org/2001/XMLSchema';
    var SchemaBuiltinTypes = {};
    SchemaBuiltinTypes[ns] = {
        variables: {},
        functions: {}
    };
    SchemaBuiltinTypes[ns].functions[ns + '#string#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'string', arity: 1, eqname: { uri: ns, name: 'string' } };
    SchemaBuiltinTypes[ns].functions[ns + '#boolean#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'boolean', arity: 1, eqname: { uri: ns, name: 'boolean' } };
    SchemaBuiltinTypes[ns].functions[ns + '#decimal#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'decimal', arity: 1, eqname: { uri: ns, name: 'decimal' } };
    SchemaBuiltinTypes[ns].functions[ns + '#float#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'float', arity: 1, eqname: { uri: ns, name: 'float' } };
    SchemaBuiltinTypes[ns].functions[ns + '#double#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'double', arity: 1, eqname: { uri: ns, name: 'double' } };
    SchemaBuiltinTypes[ns].functions[ns + '#duration#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'duration', arity: 1, eqname: { uri: ns, name: 'duration' } };
    SchemaBuiltinTypes[ns].functions[ns + '#dateTime#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'dateTime', arity: 1, eqname: { uri: ns, name: 'dateTime' } };
    SchemaBuiltinTypes[ns].functions[ns + '#time#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'time', arity: 1, eqname: { uri: ns, name: 'time' } };
    SchemaBuiltinTypes[ns].functions[ns + '#date#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'date', arity: 1, eqname: { uri: ns, name: 'date' } };
    SchemaBuiltinTypes[ns].functions[ns + '#gYearMonth#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'gYearMonth', arity: 1, eqname: { uri: ns, name: 'gYearMonth' } };
    SchemaBuiltinTypes[ns].functions[ns + '#gYear#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'gYear', arity: 1, eqname: { uri: ns, name: 'gYear' } };
    SchemaBuiltinTypes[ns].functions[ns + '#gMonthDay#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'gMonthDay', arity: 1, eqname: { uri: ns, name: 'gMonthDay' } };
    SchemaBuiltinTypes[ns].functions[ns + '#gDay#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'gDay', arity: 1, eqname: { uri: ns, name: 'gDay' } };
    SchemaBuiltinTypes[ns].functions[ns + '#gMonth#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'gMonth', arity: 1, eqname: { uri: ns, name: 'gMonth' } };
    SchemaBuiltinTypes[ns].functions[ns + '#hexBinary#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'hexBinary', arity: 1, eqname: { uri: ns, name: 'hexBinary' } };
    SchemaBuiltinTypes[ns].functions[ns + '#base64Binary#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'base64Binary', arity: 1, eqname: { uri: ns, name: 'base64Binary' } };
    SchemaBuiltinTypes[ns].functions[ns + '#anyURI#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'anyURI', arity: 1, eqname: { uri: ns, name: 'anyURI' } };
    SchemaBuiltinTypes[ns].functions[ns + '#QName#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'QName', arity: 1, eqname: { uri: ns, name: 'QName' } };
    SchemaBuiltinTypes[ns].functions[ns + '#normalizedString#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'normalizedString', arity: 1, eqname: { uri: ns, name: 'normalizedString' } };
    SchemaBuiltinTypes[ns].functions[ns + '#token#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'token', arity: 1, eqname: { uri: ns, name: 'token' } };
    SchemaBuiltinTypes[ns].functions[ns + '#language#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'language', arity: 1, eqname: { uri: ns, name: 'language' } };
    SchemaBuiltinTypes[ns].functions[ns + '#NMTOKEN#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'NMTOKEN', arity: 1, eqname: { uri: ns, name: 'NMTOKEN' } };
    SchemaBuiltinTypes[ns].functions[ns + '#Name#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'Name', arity: 1, eqname: { uri: ns, name: 'Name' } };
    SchemaBuiltinTypes[ns].functions[ns + '#NCName#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'NCName', arity: 1, eqname: { uri: ns, name: 'NCName' } };
    SchemaBuiltinTypes[ns].functions[ns + '#ID#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'ID', arity: 1, eqname: { uri: ns, name: 'ID' } };
    SchemaBuiltinTypes[ns].functions[ns + '#IDREF#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'IDREF', arity: 1, eqname: { uri: ns, name: 'IDREF' } };
    SchemaBuiltinTypes[ns].functions[ns + '#ENTITY#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'ENTITY', arity: 1, eqname: { uri: ns, name: 'ENTITY' } };
    SchemaBuiltinTypes[ns].functions[ns + '#integer#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'integer', arity: 1, eqname: { uri: ns, name: 'integer' } };
    SchemaBuiltinTypes[ns].functions[ns + '#nonPositiveInteger#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'nonPositiveInteger', arity: 1, eqname: { uri: ns, name: 'nonPositiveInteger' } };
    SchemaBuiltinTypes[ns].functions[ns + '#negativeInteger#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'negativeInteger', arity: 1, eqname: { uri: ns, name: 'negativeInteger' } };
    SchemaBuiltinTypes[ns].functions[ns + '#long#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'long', arity: 1, eqname: { uri: ns, name: 'long' } };
    SchemaBuiltinTypes[ns].functions[ns + '#int#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'int', arity: 1, eqname: { uri: ns, name: 'int' } };
    SchemaBuiltinTypes[ns].functions[ns + '#short#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'short', arity: 1, eqname: { uri: ns, name: 'short' } };
    SchemaBuiltinTypes[ns].functions[ns + '#byte#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'byte', arity: 1, eqname: { uri: ns, name: 'byte' } };
    SchemaBuiltinTypes[ns].functions[ns + '#nonNegativeInteger#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'nonNegativeInteger', arity: 1, eqname: { uri: ns, name: 'nonNegativeInteger' } };
    SchemaBuiltinTypes[ns].functions[ns + '#unsignedLong#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'unsignedLong', arity: 1, eqname: { uri: ns, name: 'unsignedLong' } };
    SchemaBuiltinTypes[ns].functions[ns + '#unsignedInt#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'unsignedInt', arity: 1, eqname: { uri: ns, name: 'unsignedInt' } };
    SchemaBuiltinTypes[ns].functions[ns + '#unsignedShort#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'unsignedShort', arity: 1, eqname: { uri: ns, name: 'unsignedShort' } };
    SchemaBuiltinTypes[ns].functions[ns + '#unsignedByte#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'unsignedByte', arity: 1, eqname: { uri: ns, name: 'unsignedByte' } };
    SchemaBuiltinTypes[ns].functions[ns + '#positiveInteger#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'positiveInteger', arity: 1, eqname: { uri: ns, name: 'positiveInteger' } };
    SchemaBuiltinTypes[ns].functions[ns + '#yearMonthDuration#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'yearMonthDuration', arity: 1, eqname: { uri: ns, name: 'yearMonthDuration' } };
    SchemaBuiltinTypes[ns].functions[ns + '#dayTimeDuration#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'dayTimeDuration', arity: 1, eqname: { uri: ns, name: 'dayTimeDuration' } };
    SchemaBuiltinTypes[ns].functions[ns + '#untypedAtomic#1'] = { params: ['$arg as xs:anyAtomicType?'], annotations: [], name: 'untypedAtomic', arity: 1, eqname: { uri: ns, name: 'untypedAtomic' } };
    return SchemaBuiltinTypes;
};