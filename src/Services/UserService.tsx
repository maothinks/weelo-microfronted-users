
import axios from 'axios';
import appSettings from "../appSettings.json"
import User from '../Models/User';

export default class UserService {
    public getById(id:string, token:string): Promise<User> {
        return new Promise((resolve, reject) => {
            let config = {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }

            axios.get(appSettings.ServerGateway + "users/" + id,  config)
                .then((res:any) => {
                    if (!res.data.success) { 
                        reject(res.data.message);
                    }

                    resolve(res.data.message);
                }). 
                catch(err => {
                    reject(err);
                });
        });
    }
  }