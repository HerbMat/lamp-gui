import { Subject } from 'rxjs'

const subject = new Subject()

const sideBarControlService = {
  setSideBarState: state => subject.next({ isClosed: state }),
  getSideBarState: () => subject.asObservable()
}

export default sideBarControlService
