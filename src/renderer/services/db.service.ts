// const config = new PouchDB('config')
// PouchDB.plugin(PouchDBFind)

// const initConfig = async () => {
//   const exists = await config.find({ selector: { _id: 'config' } })
//   if (exists.docs.length == 0) {
//     await config.put({
//       _id: 'config',
//       interval: {
//         work: '10',
//         refreshHeroes: '5',
//         checkLogin: '5',
//       },
//       threshold: {
//         default: '0.7',
//         heroComum: '0.8',
//         heroCommon: '0.8',
//         heroRare: '0.8',
//         heroSuperRare: '0.8',
//         heroEpic: '0.8',
//         heroLegend: '0.8',
//         heroSuperLegend: '0.8',
//         buttonMetamask: '0.8',
//         buttonWork: '0.9',
//         barLife: '0.9',
//       },
//       newMap: {
//         enable: '0',
//         heroComum: '0',
//         heroCommon: '0',
//         heroRare: '0',
//         heroSuperRare: '0',
//         heroEpic: '0',
//         heroLegend: '0',
//         heroSuperLegend: '0',
//         time: '2',
//       },
//     })
//   }
// }

const connect = async () => {}

export default {
  connect,
}
