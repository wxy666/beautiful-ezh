import Vue from 'vue'
import Vuex from 'vuex'
import { login, logout, getInfo } from '@/api/login'
import { getToken, 
		setToken, 
		removeToken,
		getName,
		setName,
		getRefreshToken,
		setRefreshToken,
		removeRefreshToken,
		removeSelectTab,
		getSelectTab,
		setSelectTab,
		getUserId,
		setUserId,
		removeUserId,
		removeName,
		getUserType,
		setUserType,
		removeUserType,
		getOfficeId,
		setOfficeId,
		removeOfficeId
} from '@/utils/auth'

Vue.use(Vuex)

// 存放着组件中信息的状态
const state = {
	name:getName(),//用户名
	createTime:null,
	delFlag:'',
	deptId:'',
	introduction:'',
	token: getToken(),
	refresh_token:getRefreshToken(),
	productInfo: {},
	selectTab: getSelectTab(),
	update: 0, //版本时候有更新 0 no 1 yes
	userType:getUserType(), //3--管理员 4--老师 5--家长
	userId:getUserId(), //3
//	userType:3, //3--管理员 4--老师 5--家长
//	userId:3, //3
	sysUser:{},
	officeId:getOfficeId(),
	webSocket:null,
	//引导页显示
	guide:true,
}
const getters = {
	token: state => state.token
}
const mutations = {
	SET_TOKEN: (state, token) => {
      state.token = token
    },
	SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_USERID: (state, userId) => {
		state.userId = userId
	},
	SET_USERTYPE: (state, userType) => {
		state.userType = userType
	},
    SET_INTRODUCTION: (state, introduction) => {
		state.introduction = introduction
	},
	SET_REFRESH_TOKEN: (state, rfToken) => {
      state.refresh_token = rfToken
    },
    SET_SELECTTAB: (state, selectTab) => {
      state.selectTab = selectTab
    },
    SET_SYSUSER: (state, sysUser) => {
      state.sysUser = sysUser
    },
    SET_SCOKET:(state,ws)=>{
    	state.webSocket=ws
    },
    SET_OFFICEID:(state,officeId)=>{
    	state.officeId=officeId
    }
}
const actions = {
	//登录
	Login({commit}, userInfo) {
		return new Promise((resolve, reject) => {
			login(userInfo.username, userInfo.password, userInfo.randomStr, userInfo.code).then(response => {
				console.log(response)
				const data = response.data
				setToken(data.access_token);
				setRefreshToken(data.refresh_token)
				commit('SET_TOKEN', data.access_token)
				commit('SET_REFRESH_TOKEN', data.refresh_token)
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},
	 // 获取用户信息
    GetInfo({ commit, state }) {
    console.log(state.token)
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          console.log(response)
          const data = response.data.data
          setName(data.sysUser.username);
          setUserType(data.sysUser.userType);
          setUserId(data.sysUser.userId); 
          setOfficeId(data.sysUser.officeId);
          commit('SET_NAME', data.sysUser.username)
          commit('SET_AVATAR', data.sysUser.avatar)
          commit('SET_INTRODUCTION', data.sysUser.introduction)
          commit('SET_USERID', data.sysUser.userId)
          commit('SET_USERTYPE', data.sysUser.userType)
          commit('SET_SYSUSER', data.sysUser)
          commit('SET_OFFICEID', data.sysUser.officeId)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //退出登录
    LogOut({ commit, state }) {
    	console.log(state)
    return new Promise((resolve, reject) => {
      logout(state.token, state.refresh_token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_REFRESH_TOKEN', '')
        removeToken()
        removeRefreshToken()
        removeUserId()
        removeName()
        removeUserType()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
    },
//存储websoket状态
	setScoket({commit},ws){
		commit('SET_SCOKET',ws)
	}
}
export default new Vuex.Store({
	state,
	mutations,
	actions
})