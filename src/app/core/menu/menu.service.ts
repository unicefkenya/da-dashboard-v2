import { Injectable } from '@angular/core'
import { ConstantsService } from '../../common/services/constants.service'

export interface BadgeItem {
  type: string
  value: string
}

export interface ChildrenItems {
  state: string | string[]
  name: string
  type?: string
  redirect?: boolean
}

export interface Menu {
  state: string
  name: string
  type: string
  icon: string
  badge?: BadgeItem[]
  children?: ChildrenItems[]
}


const TeacherMenu = [
  {
    state: '/',
    name: 'HOME',
    type: 'link',
    icon: 'explore'
  },
  {
    state: '/',
    name: 'Learners',
    type: 'extTabLink',
    icon: 'people_outline',
    children: [
      { state: 'add-students', name: 'Add Learner' },
      { state: 'view-students', name: 'View Learners' },
    ]
  },
  {
    state: '/',
    name: 'Reports',
    type: 'extTabLink',
    icon: 'description'
  },
  {
    state: 'settings',
    name: 'Settings',
    type: 'sub',
    icon: 'settings',
    children: [
      { state: 'profile', name: 'Profile' },
      { state: 'change-password', name: 'Change Password' },
    ]
  },
  {
    state: '#',
    name: 'DOCS',
    type: 'extTabLink',
    icon: 'local_library'
  }
]

const SchoolMenu = [
  {
    state: '/',
    name: 'HOME',
    type: 'link',
    icon: 'explore'
  },
  {
    state: 'classes',
    name: 'Classes',
    type: 'sub',
    icon: 'school',
    children: [
      { state: 'add-class', name: 'Add Class' },
      { state: 'view-classes', name: 'View Classes' },
    ]
  },
  {
    state: 'teachers',
    name: 'Teachers',
    type: 'sub',
    icon: 'people',
    children: [
      { state: 'add-teachers', name: 'Add Teachers' },
      { state: 'view-teachers', name: 'View Teachers' },
      { state: 'reset-password', name: 'Reset Password' },
    ]
  },
  {
    state: 'students',
    name: 'Learners',
    type: 'sub',
    icon: 'people_outline',
    children: [
      { state: 'add-student', name: 'Add Learner' },
      { state: 'view-students', name: 'View Learners' },
      // { state: 'move-students', name: 'Move Learners' },
      // { state: 'promote-students', name: 'Promote Learners' },
    ]
  },
  {
    state: 'settings',
    name: 'Settings',
    type: 'sub',
    icon: 'settings',
    children: [
      { state: 'profile', name: 'Profile' },
      { state: 'change-password', name: 'Change Password' },
    ]
  },
  // {
  //   state: '#',
  //   name: 'DOCS',
  //   type: 'extTabLink',
  //   icon: 'local_library'
  // }
]

// Admin menu page
const AdminMenu = [
  {
    state: '/',
    name: 'HOME',
    type: 'link',
    icon: 'explore'
  },
  {
    state: 'schools',
    name: 'Schools',
    type: 'sub',
    icon: 'school',
    children: [
      // { state: 'add-school', name: 'Add Schools' },
      { state: 'view-schools', name: 'View Schools' },
      // { state: 'schools-attendance', name: 'Schools Attendance' },
    ]
  },
  {
    state: 'teachers',
    name: 'Teachers',
    type: 'sub',
    icon: 'people',
    children: [
      // { state: 'add-teacher', name: 'Add Teacher' }, // to do face 3  and remove the authgurd for it to work;
      { state: 'view-teachers', name: 'View Teachers' },
      { state: 'reset-password', name: 'Reset Password' },
    ]
  },
  {
    state: 'students',
    name: 'Learners',
    type: 'sub',
    icon: 'people_outline',
    children: [
      { state: 'view-students', name: 'View Learners' },
    ]
  },
  {
    state: 'reports',
    name: 'Reports',
    type: 'sub',
    icon: 'file_copy',
    children: [
      //  { state: 'stats', name: 'Statistics' },
      { state: 'enrolment', name: 'Enrolment' },
      { state: 'attendance', name: 'Attendance' },
      { state: 'absence', name: 'Absenteeism' },
      { state: 'downloads', name: 'Downloads' },
    ]
  },
  {
    state: 'settings',
    name: 'Settings',
    type: 'sub',
    icon: 'settings',
    children: [
      { state: 'profile', name: 'Profile' },
      { state: 'change-password', name: 'Change Password' }
    ]
  },
  // {
  //   state: '#',
  //   name: 'DOCS',
  //   type: 'extTabLink',
  //   icon: 'local_library'
  // }
]

// // Admin menu page
// const DefaultMenu = [
//   {
//     state: '/',
//     name: 'HOME',
//     type: 'link',
//     icon: 'explore'
//   },
//   {
//     state: 'schools',
//     name: 'Schools',
//     type: 'sub',
//     icon: 'school',
//     children: [
//       { state: 'add-school', name: 'Add Schools' },
//       { state: 'view-schools', name: 'View Schools' },
//       { state: 'schools-attendance', name: 'Schools Attendance' },
//     ]
//   },
//   {
//     state: 'classes',
//     name: 'Classes',
//     type: 'sub',
//     icon: 'school',
//     children: [
//       { state: 'add-class', name: 'Add Class' },
//       { state: 'view-classes', name: 'View Classes' },
//       // { state: 'schools-attendance', name: 'Schools Attendance' },
//     ]
//   },
//   {
//     state: 'teachers',
//     name: 'Teachers',
//     type: 'sub',
//     icon: 'people',
//     children: [
//       { state: 'add-teacher', name: 'Add Teacher' },
//       { state: 'view-teachers', name: 'View Teachers' },
//       { state: 'reset-password', name: 'Reset Password' },
//     ]
//   },
//   {
//     state: 'students',
//     name: 'Students',
//     type: 'sub',
//     icon: 'people_outline',
//     children: [
//       { state: 'add-student', name: 'Add Student' },
//       { state: 'view-students', name: 'View Students' },
//       { state: 'move-students', name: 'Move Students' },
//       { state: 'promote-students', name: 'Promote Students' },
//     ]
//   },
//   // {
//   //   state: '/',
//   //   name: 'Reports',
//   //   type: 'extTabLink',
//   //   icon: 'description'
//   // },
//   {
//     state: 'settings',
//     name: 'Settings',
//     type: 'sub',
//     icon: 'settings',
//     children: [
//       { state: 'change-password', name: 'Change Password' },
//     ]
//   },
//   // {
//   //   state: '#',
//   //   name: 'DOCS',
//   //   type: 'extTabLink',
//   //   icon: 'local_library'
//   // }
// ]


const SuperAdminMenu = [
  {
    state: '/',
    name: 'HOME',
    type: 'link',
    icon: 'explore'
  },
  {
    state: 'schools',
    name: 'Schools',
    type: 'sub',
    icon: 'school',
    children: [
      // { state: 'add-school', name: 'Add Schools' },
      { state: 'view-schools', name: 'View Schools' },
      { redirect: true, state: ['settings', 'system-users'], name: 'View Users' },
      // { state: 'schools-attendance', name: 'Schools Attendance' },
    ]
  },
  {
    state: 'classes',
    name: 'Classes',
    type: 'sub',
    icon: 'class',
    children: [
      { state: 'add-class', name: 'Add Class' },
      { state: 'view-classes', name: 'View Classes' },
    ]
  },
  {
    state: 'teachers',
    name: 'Teachers',
    type: 'sub',
    icon: 'people',
    children: [
      { state: 'add-teachers', name: 'Add Teachers' },
      { state: 'view-teachers', name: 'View Teachers' },
      { state: 'reset-password', name: 'Reset Password' },
    ]
  },
  {
    state: 'students',
    name: 'Learners',
    type: 'sub',
    icon: 'people_outline',
    children: [
      { state: 'add-student', name: 'Add Learner' },
      { state: 'view-students', name: 'View Learners' },
      // { state: 'move-students', name: 'Move Learners' },
      // { state: 'promote-students', name: 'Promote Learners' },
    ]
  },
  {
    state: 'reports',
    name: 'Reports',
    type: 'sub',
    icon: 'file_copy',
    children: [
      { state: 'enrolment', name: 'Enrolment' },
      { state: 'attendance', name: 'Attendance' },
      { state: 'absence', name: 'Absenteeism' },
      { state: 'auto', name: 'Auto Reports' },
      { state: 'delete', name: 'Deactivations' },
      { state: 'downloads', name: 'Downloads' },
    ]
  },
  {
    state: 'imports',
    name: 'Imports',
    type: 'sub',
    icon: 'file_upload',
    children: [
      { state: 'clean', name: 'Data Cleaning' },
      { state: 'import', name: 'Data Importation' }
    ]
  },
  {
    state: 'settings',
    name: 'Settings',
    type: 'sub',
    icon: 'settings',
    children: [
      { state: 'profile', name: 'Profile' },
      { state: 'change-password', name: 'Change Password' },
      { state: 'system-users', name: 'System Users' },
      // { state: 'add-system-users', name: 'Add System Users' },

    ]
  },
]

@Injectable()
export class MenuService {

  role: any;

  constructor(private constantService: ConstantsService) {
    this.role = this.constantService.getUserRole()
    console.log(this.role, 'user role')
  }

  getAll(): Menu[] {
    return SuperAdminMenu;

    if (this.role === 'A') {
      //return AdminMenu;
      return SuperAdminMenu;

    } else if (this.role === 'SCHA') {
      return SchoolMenu;

    } else if (this.role === 'SCHT') {
      return TeacherMenu;
    }

  }

  add(menu) {
    AdminMenu.push(menu)
  }

  getUserRole() {
    return localStorage.getItem('user_role')
  }

}
