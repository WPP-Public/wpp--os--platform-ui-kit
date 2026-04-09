import { VNode } from '../../../stencil-public-runtime';
import { Token } from 'marked';
import { MessageRole } from '../types';
export declare const renderToken: (token: Token, role?: MessageRole) => VNode | string | (VNode | string)[] | null;
