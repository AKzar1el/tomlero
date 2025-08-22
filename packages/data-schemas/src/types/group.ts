import type { Document, Types } from 'mongoose';
<<<<<<< HEAD
import { CursorPaginationParams } from '~/common';

export interface IGroup extends Document {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  email?: string;
  avatar?: string;
  /** Array of member IDs (stores idOnTheSource values, not ObjectIds) */
  memberIds?: string[];
  source: 'local' | 'entra';
  /** External ID (e.g., Entra ID) - required for non-local sources */
  idOnTheSource?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateGroupRequest {
  name: string;
  description?: string;
  email?: string;
  avatar?: string;
  memberIds?: string[];
  source: 'local' | 'entra';
  idOnTheSource?: string;
}

export interface UpdateGroupRequest {
  name?: string;
  description?: string;
  email?: string;
  avatar?: string;
  memberIds?: string[];
  source?: 'local' | 'entra' | 'ldap';
  idOnTheSource?: string;
}

export interface GroupFilterOptions extends CursorPaginationParams {
  // Includes email, name and description
  search?: string;
  source?: 'local' | 'entra' | 'ldap';
  hasMember?: string;
}
=======

export interface IGroup extends Document {
  _id: Types.ObjectId;
  /** The name of the group */
  name: string;
  /** Optional description of the group */
  description?: string;
  /** Optional email address for the group */
  email?: string;
  /** Optional avatar URL for the group */
  avatar?: string;
  /** Array of member IDs (stores idOnTheSource values, not ObjectIds) */
  memberIds: string[];
  /** The source of the group ('local' or 'entra') */
  source: 'local' | 'entra';
  /** External ID (e.g., Entra ID) - required for non-local sources */
  idOnTheSource?: string;
  /** Timestamps */
  createdAt?: Date;
  updatedAt?: Date;
}
>>>>>>> 294faaa7 (init)
