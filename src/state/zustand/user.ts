import { create } from 'zustand'
import { pb } from '../pb/config'
import { TUser } from '../types'




interface IUserStore {
    user?:TUser
    updateUser:(new_user?:TUser)=>void
}


export const useUserStore = create<IUserStore>()((set) => ({
user:undefined,
updateUser:(new_user)=>{
    set((state)=>({user:new_user}))
}
}))
