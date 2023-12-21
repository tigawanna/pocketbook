/**
 * This file was @generated using typed-pocketbase
 */

// https://pocketbase.io/docs/collections/#base-collection
type BaseCollectionRecord = {
  id: string;
  created: string;
  updated: string;
};

// https://pocketbase.io/docs/collections/#auth-collection
type AuthCollectionRecord = {
  id: string;
  created: string;
  updated: string;
  username: string;
  email: string;
  emailVisibility: boolean;
  verified: boolean;
};

// https://pocketbase.io/docs/collections/#view-collection
type ViewCollectionRecord = {
  id: string;
};

// utilities

type MaybeArray<T> = T | T[];

// ===== pocketbook_user =====

export type PocketbookUserResponse = {
  avatar?: string;
  access_token?: string;
  bio?: string;
  github_login?: string;
  github_avatar?: string;
} & AuthCollectionRecord;

export type PocketbookUserCreate = {
  avatar?: string | URL;
  access_token?: string;
  bio?: string;
  github_login?: string;
  github_avatar?: string | URL;
};

export type PocketbookUserUpdate = {
  avatar?: string | URL;
  access_token?: string;
  bio?: string;
  github_login?: string;
  github_avatar?: string | URL;
};

export type PocketbookUserCollection = {
  type: 'auth';
  collectionId: '5sckr8a13top3zs';
  collectionName: 'pocketbook_user';
  response: PocketbookUserResponse;
  create: PocketbookUserCreate;
  update: PocketbookUserUpdate;
  relations: {
    'pocketbook_reactions(user)': PocketbookReactionsCollection[];
    'pocketbook_posts(user)': PocketbookPostsCollection[];
    'pocketbook_friends(user_a)': PocketbookFriendsCollection[];
    'pocketbook_friends(user_b)': PocketbookFriendsCollection[];
    'pocketbook_friendship(user_a)': PocketbookFriendshipCollection[];
    'pocketbook_friendship(user_b)': PocketbookFriendshipCollection[];
  };
};

// ===== pocketbook_friendship =====

export type PocketbookFriendshipResponse = {
  user_a?: string;
  user_b?: string;
  user_a_name?: string;
  user_b_name?: string;
  user_a_avatar?: string;
  user_b_avatar?: string;
  user_a_email?: string;
  user_b_email?: string;
  user_a_follow_user_b?: 'yes' | 'no';
  user_b_follow_user_a?: 'yes' | 'no';
} & ViewCollectionRecord;

export type PocketbookFriendshipCollection = {
  type: 'view';
  collectionId: 'wiu3lrsh66aclxe';
  collectionName: 'pocketbook_friendship';
  response: PocketbookFriendshipResponse;
  relations: {
    user_a: PocketbookUserCollection;
    user_b: PocketbookUserCollection;
  };
};

// ===== pocketbook_reactions =====

export type PocketbookReactionsResponse = {
  post: string;
  user: string;
  liked: 'yes' | 'no';
} & BaseCollectionRecord;

export type PocketbookReactionsCreate = {
  post: string;
  user: string;
  liked: 'yes' | 'no';
};

export type PocketbookReactionsUpdate = {
  post?: string;
  user?: string;
  liked?: 'yes' | 'no';
};

export type PocketbookReactionsCollection = {
  type: 'base';
  collectionId: '4wcaptlpivjve1o';
  collectionName: 'pocketbook_reactions';
  response: PocketbookReactionsResponse;
  create: PocketbookReactionsCreate;
  update: PocketbookReactionsUpdate;
  relations: {
    post: PocketbookPostsCollection;
    user: PocketbookUserCollection;
  };
};

// ===== mashamba_listings =====

export type MashambaListingsResponse = {
  location: string;
  longitude?: number;
  latitude?: number;
  description: string;
  images: Array<string>;
  amenities?: any;
  owner?: string;
  price: number;
  status: 'available' | 'sold';
} & BaseCollectionRecord;

export type MashambaListingsCreate = {
  location: string;
  longitude?: number;
  latitude?: number;
  description: string;
  images: MaybeArray<string>;
  amenities?: any;
  owner?: string;
  price: number;
  status: 'available' | 'sold';
};

export type MashambaListingsUpdate = {
  location?: string;
  longitude?: number;
  'longitude+'?: number;
  'longitude-'?: number;
  latitude?: number;
  'latitude+'?: number;
  'latitude-'?: number;
  description?: string;
  images?: MaybeArray<string>;
  'images-'?: MaybeArray<string>;
  amenities?: any;
  owner?: string;
  price?: number;
  'price+'?: number;
  'price-'?: number;
  status?: 'available' | 'sold';
};

export type MashambaListingsCollection = {
  type: 'base';
  collectionId: '7yy4zq0mtyj546q';
  collectionName: 'mashamba_listings';
  response: MashambaListingsResponse;
  create: MashambaListingsCreate;
  update: MashambaListingsUpdate;
  relations: {
    owner: MashambaOwnerCollection;
  };
};

// ===== mashamba_owner =====

export type MashambaOwnerResponse = {
  name: string;
  email: string;
  phone: string;
  location: string;
  image: string;
  whatsapp?: string;
} & BaseCollectionRecord;

export type MashambaOwnerCreate = {
  name: string;
  email: string;
  phone: string;
  location: string;
  image: string;
  whatsapp?: string;
};

export type MashambaOwnerUpdate = {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  image?: string;
  whatsapp?: string;
};

export type MashambaOwnerCollection = {
  type: 'base';
  collectionId: 'wbq0qz1adwxte2v';
  collectionName: 'mashamba_owner';
  response: MashambaOwnerResponse;
  create: MashambaOwnerCreate;
  update: MashambaOwnerUpdate;
  relations: {
    'mashamba_listings(owner)': MashambaListingsCollection[];
  };
};

// ===== utility_staff =====

export type UtilityStaffResponse = {
  name: string;
  type: 'caretaker' | 'manager' | 'cashier';
  avatar?: string;
} & AuthCollectionRecord;

export type UtilityStaffCreate = {
  name: string;
  type: 'caretaker' | 'manager' | 'cashier';
  avatar?: string;
};

export type UtilityStaffUpdate = {
  name?: string;
  type?: 'caretaker' | 'manager' | 'cashier';
  avatar?: string;
};

export type UtilityStaffCollection = {
  type: 'auth';
  collectionId: 'dlvnttlfiw585jv';
  collectionName: 'utility_staff';
  response: UtilityStaffResponse;
  create: UtilityStaffCreate;
  update: UtilityStaffUpdate;
  relations: {
    'tasky_tasks(created_by)': TaskyTasksCollection[];
    'tasky_tasks(updated_by)': TaskyTasksCollection[];
    'tasky_tasks(approved_by)': TaskyTasksCollection[];
    'tasky_tasks(funded_by)': TaskyTasksCollection[];
    'tasky_tasks(marked_completed_by)': TaskyTasksCollection[];
    'tasky_tasks(rejected_by)': TaskyTasksCollection[];
    'tasky_tasks(marked_in_progress_by)': TaskyTasksCollection[];
    'tasky_staff_details(leave_requested_by)': TaskyStaffDetailsCollection[];
    'tasky_staff_details(leave_approved_by)': TaskyStaffDetailsCollection[];
    'pocketbook_notifications(source)': PocketbookNotificationsCollection[];
  };
};

// ===== tasky_tasks =====

export type TaskyTasksResponse = {
  title: string;
  description: string;
  type: 'todo' | 'repairs' | 'maintenance' | 'recurring' | 'other';
  status: 'created' | 'approved' | 'funded' | 'in_progress' | 'completed' | 'rejected';
  created_by: string;
  updated_by?: string;
  approved_by?: string;
  funded_by?: string;
  marked_completed_by?: string;
  approved_on?: string;
  funded_on?: string;
  completed_on?: string;
  quotation?: string;
  deadline?: string;
  frequency?: 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  rejected_by?: string;
  marked_in_progress_by?: string;
  rejected_on?: string;
  marked_in_progress_on?: string;
} & BaseCollectionRecord;

export type TaskyTasksCreate = {
  title: string;
  description: string;
  type: 'todo' | 'repairs' | 'maintenance' | 'recurring' | 'other';
  status: 'created' | 'approved' | 'funded' | 'in_progress' | 'completed' | 'rejected';
  created_by: string;
  updated_by?: string;
  approved_by?: string;
  funded_by?: string;
  marked_completed_by?: string;
  approved_on?: string | Date;
  funded_on?: string | Date;
  completed_on?: string | Date;
  quotation?: string | URL;
  deadline?: string | Date;
  frequency?: 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  rejected_by?: string;
  marked_in_progress_by?: string;
  rejected_on?: string | Date;
  marked_in_progress_on?: string | Date;
};

export type TaskyTasksUpdate = {
  title?: string;
  description?: string;
  type?: 'todo' | 'repairs' | 'maintenance' | 'recurring' | 'other';
  status?: 'created' | 'approved' | 'funded' | 'in_progress' | 'completed' | 'rejected';
  created_by?: string;
  updated_by?: string;
  approved_by?: string;
  funded_by?: string;
  marked_completed_by?: string;
  approved_on?: string | Date;
  funded_on?: string | Date;
  completed_on?: string | Date;
  quotation?: string | URL;
  deadline?: string | Date;
  frequency?: 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  rejected_by?: string;
  marked_in_progress_by?: string;
  rejected_on?: string | Date;
  marked_in_progress_on?: string | Date;
};

export type TaskyTasksCollection = {
  type: 'base';
  collectionId: 'ipamtot35z4hzln';
  collectionName: 'tasky_tasks';
  response: TaskyTasksResponse;
  create: TaskyTasksCreate;
  update: TaskyTasksUpdate;
  relations: {
    created_by: UtilityStaffCollection;
    updated_by: UtilityStaffCollection;
    approved_by: UtilityStaffCollection;
    funded_by: UtilityStaffCollection;
    marked_completed_by: UtilityStaffCollection;
    rejected_by: UtilityStaffCollection;
    marked_in_progress_by: UtilityStaffCollection;
  };
};

// ===== tasky_staff_details =====

export type TaskyStaffDetailsResponse = {
  leave_type: 'sick' | 'annual' | 'maternity' | 'other';
  leave_reason: string;
  leave_start: string;
  leave_end: string;
  leave_requested_by: string;
  leave_approved_by?: string;
  leave_request_status: 'pending' | 'approved' | 'rejected';
  remaining_leave_days: number;
  remaining_sick_leave_days: number;
  leave_approved_on?: string;
} & BaseCollectionRecord;

export type TaskyStaffDetailsCreate = {
  leave_type: 'sick' | 'annual' | 'maternity' | 'other';
  leave_reason: string;
  leave_start: string | Date;
  leave_end: string | Date;
  leave_requested_by: string;
  leave_approved_by?: string;
  leave_request_status: 'pending' | 'approved' | 'rejected';
  remaining_leave_days: number;
  remaining_sick_leave_days: number;
  leave_approved_on?: string | Date;
};

export type TaskyStaffDetailsUpdate = {
  leave_type?: 'sick' | 'annual' | 'maternity' | 'other';
  leave_reason?: string;
  leave_start?: string | Date;
  leave_end?: string | Date;
  leave_requested_by?: string;
  leave_approved_by?: string;
  leave_request_status?: 'pending' | 'approved' | 'rejected';
  remaining_leave_days?: number;
  'remaining_leave_days+'?: number;
  'remaining_leave_days-'?: number;
  remaining_sick_leave_days?: number;
  'remaining_sick_leave_days+'?: number;
  'remaining_sick_leave_days-'?: number;
  leave_approved_on?: string | Date;
};

export type TaskyStaffDetailsCollection = {
  type: 'base';
  collectionId: 'm1ibf55enmz09s6';
  collectionName: 'tasky_staff_details';
  response: TaskyStaffDetailsResponse;
  create: TaskyStaffDetailsCreate;
  update: TaskyStaffDetailsUpdate;
  relations: {
    leave_requested_by: UtilityStaffCollection;
    leave_approved_by: UtilityStaffCollection;
  };
};

// ===== pocketbook_notifications =====

export type PocketbookNotificationsResponse = {
  name: string;
  details: string;
  source?: string;
  item_id?: string;
  type: string;
} & BaseCollectionRecord;

export type PocketbookNotificationsCreate = {
  name: string;
  details: string;
  source?: string;
  item_id?: string;
  type: string;
};

export type PocketbookNotificationsUpdate = {
  name?: string;
  details?: string;
  source?: string;
  item_id?: string;
  type?: string;
};

export type PocketbookNotificationsCollection = {
  type: 'base';
  collectionId: 'q2inux1nn05ynut';
  collectionName: 'pocketbook_notifications';
  response: PocketbookNotificationsResponse;
  create: PocketbookNotificationsCreate;
  update: PocketbookNotificationsUpdate;
  relations: {
    source: UtilityStaffCollection;
  };
};

// ===== utility_shops =====

export type UtilityShopsResponse = {
  shop_number: string;
  supa_tenant?: string;
  utils?: 'elec' | 'water' | 'both' | 'none';
  order?: number;
  supa_id?: string;
  is_vacant?: boolean;
  tenant?: string;
} & BaseCollectionRecord;

export type UtilityShopsCreate = {
  shop_number: string;
  supa_tenant?: string;
  utils?: 'elec' | 'water' | 'both' | 'none';
  order?: number;
  supa_id?: string;
  is_vacant?: boolean;
  tenant?: string;
};

export type UtilityShopsUpdate = {
  shop_number?: string;
  supa_tenant?: string;
  utils?: 'elec' | 'water' | 'both'|'none';
  order?: number;
  'order+'?: number;
  'order-'?: number;
  supa_id?: string;
  is_vacant?: boolean;
  tenant?: string;
};

export type UtilityShopsCollection = {
  type: 'base';
  collectionId: 'zb1etrv0i3olw5p';
  collectionName: 'utility_shops';
  response: UtilityShopsResponse;
  create: UtilityShopsCreate;
  update: UtilityShopsUpdate;
  relations: {
    tenant: UtilityTenantsCollection;
    'utility_bills(shop)': UtilityBillsCollection[];
  };
};

// ===== utility_tenants_base =====

export type UtilityTenantsBaseResponse = {
  name: string;
  contact?: string;
  email?: string;
  details?: string;
  supa_id?: string;
} & BaseCollectionRecord;

export type UtilityTenantsBaseCreate = {
  name: string;
  contact?: string;
  email?: string;
  details?: string;
  supa_id?: string;
};

export type UtilityTenantsBaseUpdate = {
  name?: string;
  contact?: string;
  email?: string;
  details?: string;
  supa_id?: string;
};

export type UtilityTenantsBaseCollection = {
  type: 'base';
  collectionId: '6ur1ivky21zygnv';
  collectionName: 'utility_tenants_base';
  response: UtilityTenantsBaseResponse;
  create: UtilityTenantsBaseCreate;
  update: UtilityTenantsBaseUpdate;
  relations: {};
};

// ===== utility_bills =====

export type UtilityBillsResponse = {
  shop: string;
  elec_readings?: number;
  water_readings?: number;
  month: number;
  year: number;
} & BaseCollectionRecord;

export type UtilityBillsCreate = {
  shop: string;
  elec_readings?: number;
  water_readings?: number;
  month: number;
  year: number;
};

export type UtilityBillsUpdate = {
  shop?: string;
  elec_readings?: number;
  'elec_readings+'?: number;
  'elec_readings-'?: number;
  water_readings?: number;
  'water_readings+'?: number;
  'water_readings-'?: number;
  month?: number;
  'month+'?: number;
  'month-'?: number;
  year?: number;
  'year+'?: number;
  'year-'?: number;
};

export type UtilityBillsCollection = {
  type: 'base';
  collectionId: 'cvtakohtxaagiat';
  collectionName: 'utility_bills';
  response: UtilityBillsResponse;
  create: UtilityBillsCreate;
  update: UtilityBillsUpdate;
  relations: {
    shop: UtilityShopsCollection;
  };
};

// ===== pocketbook_posts =====

export type PocketbookPostsResponse = {
  body?: string;
  media?: string;
  user: string;
  parent?: string;
  depth?: number;
} & BaseCollectionRecord;

export type PocketbookPostsCreate = {
  body?: string;
  media?: string;
  user: string;
  parent?: string;
  depth?: number;
};

export type PocketbookPostsUpdate = {
  body?: string;
  media?: string;
  user?: string;
  parent?: string;
  depth?: number;
  'depth+'?: number;
  'depth-'?: number;
};

export type PocketbookPostsCollection = {
  type: 'base';
  collectionId: 'vbse1l0qet8z4hu';
  collectionName: 'pocketbook_posts';
  response: PocketbookPostsResponse;
  create: PocketbookPostsCreate;
  update: PocketbookPostsUpdate;
  relations: {
    'pocketbook_reactions(post)': PocketbookReactionsCollection[];
    user: PocketbookUserCollection;
    parent: PocketbookPostsCollection;
    'pocketbook_posts(parent)': PocketbookPostsCollection[];
  };
};

// ===== pocketbook_friends =====

export type PocketbookFriendsResponse = {
  user_a?: string;
  user_b?: string;
  user_a_follow_user_b?: 'yes' | 'no';
  user_b_follow_user_a?: 'yes' | 'no';
} & BaseCollectionRecord;

export type PocketbookFriendsCreate = {
  user_a?: string;
  user_b?: string;
  user_a_follow_user_b?: 'yes' | 'no';
  user_b_follow_user_a?: 'yes' | 'no';
};

export type PocketbookFriendsUpdate = {
  user_a?: string;
  user_b?: string;
  user_a_follow_user_b?: 'yes' | 'no';
  user_b_follow_user_a?: 'yes' | 'no';
};

export type PocketbookFriendsCollection = {
  type: 'base';
  collectionId: 'rjrl9uzeu508rf3';
  collectionName: 'pocketbook_friends';
  response: PocketbookFriendsResponse;
  create: PocketbookFriendsCreate;
  update: PocketbookFriendsUpdate;
  relations: {
    user_a: PocketbookUserCollection;
    user_b: PocketbookUserCollection;
  };
};

// ===== utility_tenants =====

export type UtilityTenantsResponse = {
  phone?: string;
  avatar?:string; 
} & AuthCollectionRecord;

export type UtilityTenantsCreate = {
  phone?: string;
  avatar?: string|File;
};

export type UtilityTenantsUpdate = {
  phone?: string;
  avatar?: string | File;
};

export type UtilityTenantsCollection = {
  type: 'auth';
  collectionId: 'vdjzfr0gybtmwif';
  collectionName: 'utility_tenants';
  response: UtilityTenantsResponse;
  create: UtilityTenantsCreate;
  update: UtilityTenantsUpdate;
  relations: {
    'utility_shops(tenant)': UtilityShopsCollection[];
  };
};




// ===== Schema =====

export type Schema = {
// mashamba
  // mashamba_listings: MashambaListingsCollection;
  // mashamba_owner: MashambaOwnerCollection;
// tasky
  // tasky_tasks: TaskyTasksCollection;
  // tasky_staff_details: TaskyStaffDetailsCollection;
// pocketbook
  pocketbook_user: PocketbookUserCollection;
  pocketbook_reactions: PocketbookReactionsCollection;
  pocketbook_notifications: PocketbookNotificationsCollection;
  pocketbook_posts: PocketbookPostsCollection;
  pocketbook_friends: PocketbookFriendsCollection;
  pocketbook_friendship: PocketbookFriendshipCollection;
// utility
  // utility_shops: UtilityShopsCollection;
  // utility_staff: UtilityStaffCollection;
  // utility_tenants_base: UtilityTenantsBaseCollection;
  // utility_bills: UtilityBillsCollection;
  // utility_tenants: UtilityTenantsCollection;
};
