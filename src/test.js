import zipson from 'zipson'
import serialize from 'serialize-javascript';
function deserialize(serializedJavascript){
  return eval('(' + serializedJavascript + ')');
}
const map = new Map()
map.set('kotaro', 'user')

const object = {
  myMap: map,
  kot: 123
}
console.log(zipson.serialize(serialize(object.myMap)))
console.log(deserialize(serialize(object.myMap)) instanceof Map)
console.log(JSON.parse(JSON.stringify(object))?.myMap instanceof Map)
