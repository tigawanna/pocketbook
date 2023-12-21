import PocketBase, { RecordModel as Record$1, RecordService, ListResult, RecordSubscription, UnsubscribeFunc } from 'pocketbase';

type Simplify<T> = T extends infer o ? {
    [K in keyof o]: o[K];
} : never;
type ArrayInnerType<T> = T extends Array<infer V> ? V : T;
type Values<T> = T[keyof T];
type LooseAutocomplete<T> = T | (string & {});
type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;
type BaseRecord = Record<string, any>;
interface GenericCollection {
    collectionId: string;
    collectionName: string;
    response: BaseRecord;
    create?: BaseRecord;
    update?: BaseRecord;
    relations: Record<string, GenericCollection | GenericCollection[]>;
}
interface GenericSchema {
    [K: string]: GenericCollection;
}
type TypedRecord<Data extends BaseRecord, Expand extends GenericExpand = {}> = Pick<Record$1, 'load' | '$load' | '$isNew'> & Data & {
    load(data: Data): void;
    $load(data: Data): void;
    clone(): TypedRecord<Data, Expand>;
    $clone(): TypedRecord<Data, Expand>;
    export(): Data;
    $export(): Data;
    expand: Expand;
};
type Fields<T extends GenericCollection> = keyof T['response'];
type Columns<T extends GenericCollection> = T['response'];
type GenericExpand = Record<string, TypedRecord<any> | TypedRecord<any>[]>;
type JoinPath<Parts extends string[]> = Parts extends [
    infer A extends string,
    ...infer Rest extends string[]
] ? Rest['length'] extends 0 ? A : `${A}.${JoinPath<Rest>}` : never;
type _RecordWithExpandToDotPath<T extends GenericCollection, Path extends string[] = []> = {
    [K in keyof T['response']as JoinPath<[
        ...Path,
        K & string
    ]>]: T['response'][K];
} & (Path['length'] extends 4 ? {} : UnionToIntersection<Values<{
    [K in keyof T['relations']]: _RecordWithExpandToDotPath<ArrayInnerType<T['relations'][K]>, [
        ...Path,
        K & string
    ]>;
}>>);
type RecordWithExpandToDotPath<T extends GenericCollection> = Simplify<_RecordWithExpandToDotPath<T>>;

type FieldsParam<T extends BaseRecord, S extends keyof T> = {
    __record__?: T;
    __select__?: S;
} & string;
declare function fields<T extends BaseRecord, S extends keyof T>(...fields: (S | false | undefined | null | keyof T)[]): FieldsParam<T, S>;

type ActualFilter<T extends any, K extends keyof T = keyof T> = [
    K,
    FilterOperand,
    T[K]
];
type FilterOperand = '=' | '!=' | '>' | '>=' | '<' | '<=' | '~' | '!~' | '?=' | '?!=' | '?>' | '?>=' | '?<' | '?<=' | '?~' | '?!~';
export type FilterParam<T extends BaseRecord> = {
    __record__?: T;
} & string;
type Filter<T extends BaseRecord> = ActualFilter<T> | FilterParam<T> | false | null | undefined;
declare function and<T extends BaseRecord>(...filters: Filter<T>[]): FilterParam<T>;
declare function or<T extends BaseRecord>(...filters: Filter<T>[]): FilterParam<T>;
declare function eq<T extends BaseRecord, Key extends keyof T>(column: Key, value: T[Key]): FilterParam<T>;
declare function neq<T extends BaseRecord, Key extends keyof T>(column: Key, value: T[Key]): FilterParam<T>;
declare function gt<T extends BaseRecord, Key extends keyof T>(column: Key, value: T[Key]): FilterParam<T>;
declare function gte<T extends BaseRecord, Key extends keyof T>(column: Key, value: T[Key]): FilterParam<T>;
declare function lt<T extends BaseRecord, Key extends keyof T>(column: Key, value: T[Key]): FilterParam<T>;
declare function lte<T extends BaseRecord, Key extends keyof T>(column: Key, value: T[Key]): FilterParam<T>;
declare function like<T extends BaseRecord, Key extends keyof T>(column: Key, value: T[Key]): FilterParam<T>;
declare function nlike<T extends BaseRecord, Key extends keyof T>(column: Key, value: T[Key]): FilterParam<T>;

export type SortParam<T extends BaseRecord> = {
    __record__?: T;
} & string;
type PrefixedSortItem<T> = T extends string ? `${'+' | '-'}${T}` : never;
declare function sort<T extends BaseRecord>(...sorters: Array<SortParam<T> | PrefixedSortItem<keyof T>>): SortParam<T>;
declare function asc<T extends BaseRecord>(column: keyof T): SortParam<T>;
declare function desc<T extends BaseRecord>(column: keyof T): SortParam<T>;

type ExpandParam<T extends GenericCollection, E extends GenericExpand> = {
    __record__?: T;
    __expand__?: E;
} & string;
type Expand<T extends GenericCollection> = {
    [K in keyof T['relations']]?: true | Expand<ArrayInnerType<T['relations'][K]>>;
};
type RelationToTypedRecord<T extends GenericCollection | GenericCollection[], E extends GenericExpand = {}> = T extends GenericCollection[] ? TypedRecord<T[number]['response'], E>[] : T extends GenericCollection ? TypedRecord<T['response'], E> : never;
type UnpackExpand<T extends GenericCollection, E extends Expand<T>> = Simplify<{
    [K in keyof E & keyof T['relations']]: RelationToTypedRecord<T['relations'][K], E[K] extends Expand<GenericCollection> ? UnpackExpand<ArrayInnerType<T['relations'][K]>, E[K]> : {}>;
}>;
declare function expand<T extends GenericCollection, E extends Expand<T>>(expand: E): ExpandParam<T, UnpackExpand<T, E>>;
// @ts-expect-error
interface TypedRecordService<Collection extends GenericCollection> extends RecordService {
    getFullList<Select extends Fields<Collection> = Fields<Collection>, Expand extends GenericExpand = {}>(queryParams?: TypedRecordFullListQueryParams<Collection, Select, Expand>): Promise<TypedRecord<Simplify<Pick<Columns<Collection>, Select>>, Expand>[]>;
    getFullList<Select extends Fields<Collection> = Fields<Collection>, Expand extends GenericExpand = {}>(batch?: number, queryParams?: TypedRecordListQueryParams<Collection, Select, Expand>): Promise<TypedRecord<Simplify<Pick<Columns<Collection>, Select>>, Expand>[]>;
    getList<Select extends Fields<Collection> = Fields<Collection>,
     Expand extends GenericExpand = {}>(page?: number, perPage?: number, queryParams?:
         TypedRecordListQueryParams<Collection, Select, Expand>): Promise<ListResult<TypedRecord<Simplify<Pick<Columns<Collection>, Select>>, Expand>>>;
    getFirstListItem<Select extends Fields<Collection> = Fields<Collection>, Expand extends GenericExpand = {}>(filter: Filter<RecordWithExpandToDotPath<Collection>>, queryParams?: TypedRecordListQueryParams<Collection, Select, Expand>): Promise<TypedRecord<Simplify<Pick<Columns<Collection>, Select>>, Expand>>;
    getOne<Select extends Fields<Collection> = Fields<Collection>, Expand extends GenericExpand = {}>(id: string, queryParams?: TypedRecordQueryParams<Collection, Select, Expand>): Promise<TypedRecord<Simplify<Pick<Columns<Collection>, Select>>, Expand>>;
    create<Select extends Fields<Collection> = Fields<Collection>, Expand extends GenericExpand = {}>(bodyParams: Collection['create'], queryParams?: TypedRecordQueryParams<Collection, Select, Expand>): Promise<TypedRecord<Simplify<Pick<Columns<Collection>, Select>>, Expand>>;
    update<Select extends Fields<Collection> = Fields<Collection>, Expand extends GenericExpand = {}>(id: string, bodyParams: Collection['update'], queryParams?: TypedRecordQueryParams<Collection, Select, Expand>): Promise<TypedRecord<Simplify<Pick<Columns<Collection>, Select>>, Expand>>;
    subscribe(topic: LooseAutocomplete<'*'>, callback: (data: RecordSubscription<TypedRecord<Columns<Collection>>>) => void): Promise<UnsubscribeFunc>;
    subscribe(callback: (data: RecordSubscription<TypedRecord<Columns<Collection>>>) => void): Promise<UnsubscribeFunc>;
}
interface TypedBaseQueryParams<T extends GenericCollection, S extends Fields<T>> {
    fields?: FieldsParam<Columns<T>, S>;
    $autoCancel?: boolean;
    $cancelKey?: string;
}
interface TypedListQueryParams<T extends GenericCollection, S extends Fields<T>> extends TypedBaseQueryParams<T, S> {
    page?: number;
    perPage?: number;
    sort?: SortParam<RecordWithExpandToDotPath<T>>;
    filter?: FilterParam<RecordWithExpandToDotPath<T>>;
}
interface TypedFullListQueryParams<T extends GenericCollection, S extends Fields<T>> extends TypedListQueryParams<T, S> {
    batch?: number;
}
interface TypedRecordQueryParams<T extends GenericCollection, S extends Fields<T>, E extends GenericExpand> extends TypedBaseQueryParams<T, S> {
    expand?: ExpandParam<T, E>;
}
export interface TypedRecordListQueryParams<T extends GenericCollection, S extends Fields<T>, E extends GenericExpand> extends TypedListQueryParams<T, S>, TypedRecordQueryParams<T, S, E> {
}
interface TypedRecordFullListQueryParams<T extends GenericCollection, S extends Fields<T>, E extends GenericExpand> extends TypedFullListQueryParams<T, S>, TypedRecordQueryParams<T, S, E> {
}



