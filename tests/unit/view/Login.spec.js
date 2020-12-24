import Vuex from 'vuex'
import { mount, shallowMount } from '@vue/test-utils'
import Login from '../../../src/views/Login'

// const localVue = createLocalVue()
// localVue.use(Vuex)

describe('Login.vue', () => {
  const wrapper = mount(Login)

  it('has data', () => {
    expect(typeof Login.data).toBe('function')
    expect(Login.data().user.username).toBe('')
    expect(Login.data().user.password).toBe('')
    expect(Login.data().errors).toEqual([])
  })

  it('Snapshot match', () => {
    const wrapperToCheck = shallowMount(Login, {})
    expect(wrapperToCheck).toMatchSnapshot()
  })

  it('Prints form errors when from empty', () => {
    wrapper.find('#login-submit').trigger('click')
    expect(wrapper.vm.errors.length).toEqual(2)
    expect(wrapper.find('.error').exists()).toBeTruthy()
  })
})
