import Vue from 'vue'
import Router from 'vue-router'
//import Recommond from '@/components/Recommond/Recommond'
//import Interact from '@/components/interact/interact'
//import Find from '@/components/find/find'
//import Myself from '@/components/myself/myself'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			redirect: '/login'
		},
		{
			//登录
			path: '/login',
			component: resolve => require(['@/components/login/login'], resolve),
			children: [{
				path: 'forgetPW',
				component: resolve => require(['@/components/forgetPW/forgetPW'], resolve),
				children: [{
					path: 'resetPW',
					component: resolve => require(['@/components/forgetPW/resetPW'], resolve),
				}]
			}]
		},
		{
			//校园
			path: '/Recommond',
			meta: {
				navShow: true
			},
			component: resolve => require(['@/components/Recommond/Recommond'], resolve),
			children: [{
					//个人考勤
					path: 'kqCon',
					meta: {
						navShow: false
					},
					component: resolve => require(['@/components/kqCon/kqCon'], resolve),
				},
				{
					//个人体感
					path: 'feelCon',
					meta: {
						navShow: false
					},
					component: resolve => require(['@/components/feel/feelCon'], resolve)
				},
				{
					path: 'maillist', //通讯录（发消息）
					meta: {
						navShow: false
					},
					component: resolve => require(['@/components/maillist/maillist'], resolve),
					children: [{
						path: 'contactDetails', //通讯录致电
						component: resolve => require(['@/components/contactDetails/contactDetails'], resolve),
						children: [{
							//单个通讯人
							path: 'mailsingle',
							component: resolve => require(['@/components/mailsingle/mailsingle'], resolve)
						}]
					}]
				}

			]
		},
		{
			//互动
			path: '/interact',
			meta: {
				navShow: true
			},
			component: resolve => require(['@/components/interact/interact'], resolve),
			children: [{
					//通讯录（发消息）
					path: 'maillist',
					component: resolve => require(['@/components/maillist/maillist'], resolve),
					children: [{
						//单个通讯人
						path: 'mailsingle',
						component: resolve => require(['@/components/mailsingle/mailsingle'], resolve)
					}]
				},
				{
					//发通知
					path: 'notice',
					component: resolve => require(['@/components/notice/notice'], resolve),
					children: [
						//通知列表
						{
							path: 'noticeList',
							component: resolve => require(['@/components/noticeList/noticeList'], resolve)
						},
						//选择联系人
						{
							path: 'selectPeople',
							component: resolve => require(['@/components/selectPeople/selectPeople'], resolve)
						}
					]
				},
				{
					//发表现 performance
					path: 'performance',
					component: resolve => require(['@/components/performance/performance'], resolve),
					children: [{
							//表现列表
							path: 'performanceList',
							component: resolve => require(['@/components/performanceList/performanceList'], resolve)
						},
						//选择联系人
						{
							path: 'selectPeople',
							component: resolve => require(['@/components/selectPeople/selectPeople'], resolve)
						}
					]
				}
			]
		},
		{
			//发现
			path: '/find',
			meta: {
				navShow: true
			},
			component: resolve => require(['@/components/find/find'], resolve)
		},
		{
			//我的
			path: '/myself',
			meta: {
				navShow: true
			},
			component: resolve => require(['@/components/myself/myself'], resolve),
			children: [{
					//我的书架
					path: 'book',
					component: resolve => require(['@/components/book/book'], resolve),
					children: [{
						path: 'bookDetail',
						component: resolve => require(['@/components/book/bookDetail'], resolve),
						children: [{
							path: 'bookVideo',
							component: resolve => require(['@/components/book/bookVideo'], resolve)
						}]
					}]
				},
				{
					//个人信息
					path: 'person',
					component: resolve => require(['@/components/person/person'], resolve),
					children: [{
						//camera
						path: 'camera',
						component: resolve => require(['@/components/camera/camera'], resolve),
					}]
				},
				{
					//修改密码
					path: 'changePW',
					component: resolve => require(['@/components/changePW/changePW'], resolve),
				},
				{
					//设备管理
					path: 'manage',
					component: resolve => require(['@/components/manage/manage'], resolve),
				},
				{
					//意见反馈
					path: 'feedback',
					component: resolve => require(['@/components/feedback/feedback'], resolve),
				},
				{
					//检测更新
					path: 'update',
					name: 'update',
					component: resolve => require(['@/components/update/update'], resolve),
				}

			]
		},
		{
			path: '/baby', //宝宝在线
			meta: {
				navShow: false
			},
			component: resolve => require(['@/components/baby/baby'], resolve)
		},
		{
			path: '/cookbook', //食谱
			meta: {
				navShow: false
			},
			component: resolve => require(['@/components/cookbook/cookbook'], resolve)
		},
		{
			path: '/BabyCircle', //宝贝圈
			meta: {
				navShow: false
			},
			component: resolve => require(['@/components/BabyCircle/BabyCircle'], resolve)
		},
		{
			path: '/kaoqin', //考勤
			meta: {
				navShow: false
			},
			component: resolve => require(['@/components/kaoqin/kaoqin'], resolve),
			children: [{
				//个人信息
				path: 'lesson',
				meta: {
					navShow: false
				},
				component: resolve => require(['@/components/lesson/lesson'], resolve),
				children: [{
					//个人考勤
					path: 'kqCon',
					meta: {
						navShow: false
					},
					component: resolve => require(['@/components/kqCon/kqCon'], resolve)
				}]
			}]

		},
		{
			//体感
			path: '/feel',
			meta: {
				navShow: false
			},
			component: resolve => require(['@/components/feel/feel'], resolve),
			children: [{
				//个人信息
				path: 'lesson',
				meta: {
					navShow: false
				},
				component: resolve => require(['@/components/feel/lesson'], resolve),
				children: [{
					//个人体感
					path: 'feelCon',
					meta: {
						navShow: false
					},
					component: resolve => require(['@/components/feel/feelCon'], resolve)
				}]
			}]
		},
		{
			//表现列表
			path: '/performanceList',
			meta: {
				navShow: false
			},
			component: resolve => require(['@/components/performanceList/performanceList'], resolve)
		},
		//园长信箱
		{
			path: '/noticeList',
			meta: {
				navShow: false
			},
			component: resolve => require(['@/components/noticeList/noticeList'], resolve)
		},
		{
			//个人信息
			path: '/person',
			component: resolve => require(['@/components/person/person'], resolve),
			children: [{
				path: 'editor',
				component: resolve => require(['@/components/editor/editor'], resolve)
			}]
		},
		{
			path: '/maillist', //通讯录（发消息）
			meta: {
				navShow: false
			},
			component: resolve => require(['@/components/maillist/maillist'], resolve),
			children: [{
				path: 'contactDetails', //通讯录致电
				component: resolve => require(['@/components/contactDetails/contactDetails'], resolve),
				children: [{
					//单个通讯人
					path: 'mailsingle',
					component: resolve => require(['@/components/mailsingle/mailsingle'], resolve)
				}]
			}]
		}
	]
})