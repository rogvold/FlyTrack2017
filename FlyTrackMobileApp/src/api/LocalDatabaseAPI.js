/**
 * Created by sabir on 31.07.17.
 */
import PouchDB from 'pouchdb-react-native' ;
import { SQLite } from 'expo' ;

const LocalDatabaseAPI = {

    getDbInstance(){
        return new Promise((resolve, reject) => {
            let db = SQLite.openDatabase({ name: 'db.flytrack' });
            db.transaction(tx => {
                tx.executeSql(
                    'create table if not exists points' +
                    ' (id integer primary key not null, ' +
                    'userId text, startTimestamp double, lat double, lon double, alt double, acc double, vel double, bea double, t double, synced int);' +
                    '' +
                    'create table if not exists sessions ' +
                    '(id integer primary key not null,' +
                    'startTimestamp double, userId text, externalId text, name text, description text);'
                );
            });
            resolve(db);
        })

    },

    getUserGeoPointsInRange(userId, startTimestamp = 0, endTimestamp = +new Date()){
        return new Promise((resolve, reject) => {
            this.getDbInstance().then(
                db => {
                    db.transaction(tx => {
                        tx.executeSql(
                            `select * from points where userId = ? and t > ? and t < ?;`,
                            [userId, startTimestamp, endTimestamp],
                            (_, { rows: { _array } }) => {
                                resolve(_array);
                            }, (tr, err) => {
                                console.log('can not select points: tr, err = ', tr, err);
                                reject(err)
                            }
                        );
                    }, err => {reject(err)}, () => {});
                }
            )
        })
    },

    saveGeoPoint(d){
        console.log('saveGeoPoint: d = ', d);
        return new Promise((resolve, reject) => {
            this.getDbInstance().then(
                db => {
                    console.log('got db instance');
                    db.transaction(tx => {
                        console.log('started transaction: trying to insert ', d);
                        tx.executeSql(
                            `insert into points (userId, startTimestamp, t, lat, lon, alt, acc, vel, bea, synced) values (?, ?, ?, ?, ?, ?, ?, ?, ?, 0);`,
                            [d.userId, d.startTimestamp, d.t, d.lat, d.lon, d.alt, d.acc, d.vel, d.bea],
                            (_, { insertId }) => {
                                resolve(insertId);
                            }, (tr, err) => {
                                console.log('executeSql: error occured tr, err = ', tr, err);
                                reject(err)
                            }
                        );
                    }, err => {
                        console.log('transaction: error occured: err = ', err);
                        reject(err)
                    }, () => {

                    });
                }
            );
        })
    },

    dropGeoPointsTable(){
        return new Promise((resolve, reject) => {
            this.getDbInstance().then(
                db => {
                    console.log('got db instance');
                    db.transaction(tx => {
                        console.log('started transaction: trying to drop table ');
                        tx.executeSql(
                            `drop table if exists points`,
                            [],
                            () => {
                                resolve();
                            }, (tr, err) => {
                                console.log('executeSql: error occured tr, err = ', tr, err);
                                reject(err)
                            }
                        );
                    }, err => {
                        console.log('transaction: error occured: err = ', err);
                        reject(err)
                    }, () => {

                    });
                }
            );
        })
    },

    createSession(data){
        let startTimestamp = +new Date();
        return new Promise((resolve, reject) => {
            this.getDbInstance().then(
                db => {
                    console.log('got db instance');
                    db.transaction(tx => {
                        console.log('started transaction: trying to drop table ');
                        tx.executeSql(
                            `insert into sessions (userId, startTimestamp, name)
                                    select ?, ?, ? from dual
                                        WHERE NOT EXISTS (SELECT 1 
                                                                FROM sessions 
                                                                WHERE startTimestamp = ?);
                            `,
                            [data.userId, startTimestamp, data.name, startTimestamp],
                            () => {
                                resolve();
                            }, (tr, err) => {
                                console.log('executeSql: error occured tr, err = ', tr, err);
                                reject(err)
                            }
                        );
                    }, err => {
                        console.log('transaction: error occured: err = ', err);
                        reject(err)
                    }, () => {

                    });
                }
            );
        })
    }

}

export default LocalDatabaseAPI