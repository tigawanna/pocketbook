import { create } from 'zustand'
import { PBUserRecord } from '../user'


interface IUserStore {
    user?:PBUserRecord
    updateUser:(new_user?:PBUserRecord)=>void
}


export const useUserStore = create<IUserStore>()((set) => ({
user:undefined,
updateUser:(new_user)=>{
    set((state)=>({user:new_user}))
}
}))
