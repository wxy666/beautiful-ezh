import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const userName='userName'
const RefreshToken='Admin-RefreshToken'
const SelectTab='Admin-selectTab'
const userId='Admin-userId'
const userType='userType'
const OfficeId="officeId"
export function getUsert() {
  return Cookies.get('usert')
}

export function setUsert(usert) {
  return Cookies.set('usert', usert)
}

export function removeUsert() {
  return Cookies.remove('usert')
}



export function getUserType() {
  return Cookies.get(userType)
}

export function setUserType(usertype) {
  return Cookies.set(userType, usertype)
}

export function removeUserType() {
  return Cookies.remove(userType)
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getName() {
  return Cookies.get(userName)
}
export function setName(username) {
  return Cookies.set(userName,username)
}
export function removeName() {
  return Cookies.remove(userName)
}

export function getRefreshToken() {
  return Cookies.get(RefreshToken)
}

export function setRefreshToken(token) {
  return Cookies.set(RefreshToken, token)
}

export function removeRefreshToken() {
  return Cookies.remove(RefreshToken)
}

export function getSelectTab() {
  return Cookies.get(SelectTab)
}

export function setSelectTab(selecte) {
  return Cookies.set(SelectTab, selecte)
}

export function removeSelectTab() {
  return Cookies.remove(SelectTab)
}

export function getUserId() {
  return Cookies.get(userId)
}

export function setUserId(UserId) {
  return Cookies.set(userId, UserId)
}

export function removeUserId() {
  return Cookies.remove(userId)
}
export function getOfficeId() {
  return Cookies.get(OfficeId)
}

export function setOfficeId(officeId) {
  return Cookies.set(OfficeId, officeId)
}

export function removeOfficeId() {
  return Cookies.remove(OfficeId)
}