
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Verification
 * 
 */
export type Verification = $Result.DefaultSelection<Prisma.$VerificationPayload>
/**
 * Model PageInfo
 * 
 */
export type PageInfo = $Result.DefaultSelection<Prisma.$PageInfoPayload>
/**
 * Model Menu
 * 
 */
export type Menu = $Result.DefaultSelection<Prisma.$MenuPayload>
/**
 * Model EvenementStress
 * 
 */
export type EvenementStress = $Result.DefaultSelection<Prisma.$EvenementStressPayload>
/**
 * Model ResultatDiagnostic
 * 
 */
export type ResultatDiagnostic = $Result.DefaultSelection<Prisma.$ResultatDiagnosticPayload>
/**
 * Model ReponseDiagnostic
 * 
 */
export type ReponseDiagnostic = $Result.DefaultSelection<Prisma.$ReponseDiagnosticPayload>
/**
 * Model EmotionNiveau1
 * 
 */
export type EmotionNiveau1 = $Result.DefaultSelection<Prisma.$EmotionNiveau1Payload>
/**
 * Model EmotionNiveau2
 * 
 */
export type EmotionNiveau2 = $Result.DefaultSelection<Prisma.$EmotionNiveau2Payload>
/**
 * Model JournalEmotion
 * 
 */
export type JournalEmotion = $Result.DefaultSelection<Prisma.$JournalEmotionPayload>
/**
 * Model SupportTicket
 * 
 */
export type SupportTicket = $Result.DefaultSelection<Prisma.$SupportTicketPayload>
/**
 * Model ExerciceRespiration
 * 
 */
export type ExerciceRespiration = $Result.DefaultSelection<Prisma.$ExerciceRespirationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const SupportCategory: {
  ACCOUNT: 'ACCOUNT',
  TECHNICAL: 'TECHNICAL',
  USAGE: 'USAGE',
  PRIVACY: 'PRIVACY',
  OTHER: 'OTHER'
};

export type SupportCategory = (typeof SupportCategory)[keyof typeof SupportCategory]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type SupportCategory = $Enums.SupportCategory

export const SupportCategory: typeof $Enums.SupportCategory

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verifications
    * const verifications = await prisma.verification.findMany()
    * ```
    */
  get verification(): Prisma.VerificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pageInfo`: Exposes CRUD operations for the **PageInfo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PageInfos
    * const pageInfos = await prisma.pageInfo.findMany()
    * ```
    */
  get pageInfo(): Prisma.PageInfoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.menu`: Exposes CRUD operations for the **Menu** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Menus
    * const menus = await prisma.menu.findMany()
    * ```
    */
  get menu(): Prisma.MenuDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.evenementStress`: Exposes CRUD operations for the **EvenementStress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EvenementStresses
    * const evenementStresses = await prisma.evenementStress.findMany()
    * ```
    */
  get evenementStress(): Prisma.EvenementStressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resultatDiagnostic`: Exposes CRUD operations for the **ResultatDiagnostic** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ResultatDiagnostics
    * const resultatDiagnostics = await prisma.resultatDiagnostic.findMany()
    * ```
    */
  get resultatDiagnostic(): Prisma.ResultatDiagnosticDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reponseDiagnostic`: Exposes CRUD operations for the **ReponseDiagnostic** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReponseDiagnostics
    * const reponseDiagnostics = await prisma.reponseDiagnostic.findMany()
    * ```
    */
  get reponseDiagnostic(): Prisma.ReponseDiagnosticDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emotionNiveau1`: Exposes CRUD operations for the **EmotionNiveau1** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmotionNiveau1s
    * const emotionNiveau1s = await prisma.emotionNiveau1.findMany()
    * ```
    */
  get emotionNiveau1(): Prisma.EmotionNiveau1Delegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emotionNiveau2`: Exposes CRUD operations for the **EmotionNiveau2** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmotionNiveau2s
    * const emotionNiveau2s = await prisma.emotionNiveau2.findMany()
    * ```
    */
  get emotionNiveau2(): Prisma.EmotionNiveau2Delegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.journalEmotion`: Exposes CRUD operations for the **JournalEmotion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JournalEmotions
    * const journalEmotions = await prisma.journalEmotion.findMany()
    * ```
    */
  get journalEmotion(): Prisma.JournalEmotionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.supportTicket`: Exposes CRUD operations for the **SupportTicket** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SupportTickets
    * const supportTickets = await prisma.supportTicket.findMany()
    * ```
    */
  get supportTicket(): Prisma.SupportTicketDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.exerciceRespiration`: Exposes CRUD operations for the **ExerciceRespiration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExerciceRespirations
    * const exerciceRespirations = await prisma.exerciceRespiration.findMany()
    * ```
    */
  get exerciceRespiration(): Prisma.ExerciceRespirationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Session: 'Session',
    Account: 'Account',
    Verification: 'Verification',
    PageInfo: 'PageInfo',
    Menu: 'Menu',
    EvenementStress: 'EvenementStress',
    ResultatDiagnostic: 'ResultatDiagnostic',
    ReponseDiagnostic: 'ReponseDiagnostic',
    EmotionNiveau1: 'EmotionNiveau1',
    EmotionNiveau2: 'EmotionNiveau2',
    JournalEmotion: 'JournalEmotion',
    SupportTicket: 'SupportTicket',
    ExerciceRespiration: 'ExerciceRespiration'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "session" | "account" | "verification" | "pageInfo" | "menu" | "evenementStress" | "resultatDiagnostic" | "reponseDiagnostic" | "emotionNiveau1" | "emotionNiveau2" | "journalEmotion" | "supportTicket" | "exerciceRespiration"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Verification: {
        payload: Prisma.$VerificationPayload<ExtArgs>
        fields: Prisma.VerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findFirst: {
            args: Prisma.VerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findMany: {
            args: Prisma.VerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          create: {
            args: Prisma.VerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          createMany: {
            args: Prisma.VerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.VerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          update: {
            args: Prisma.VerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          deleteMany: {
            args: Prisma.VerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification>
          }
          groupBy: {
            args: Prisma.VerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationCountAggregateOutputType> | number
          }
        }
      }
      PageInfo: {
        payload: Prisma.$PageInfoPayload<ExtArgs>
        fields: Prisma.PageInfoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PageInfoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageInfoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PageInfoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageInfoPayload>
          }
          findFirst: {
            args: Prisma.PageInfoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageInfoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PageInfoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageInfoPayload>
          }
          findMany: {
            args: Prisma.PageInfoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageInfoPayload>[]
          }
          create: {
            args: Prisma.PageInfoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageInfoPayload>
          }
          createMany: {
            args: Prisma.PageInfoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PageInfoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageInfoPayload>
          }
          update: {
            args: Prisma.PageInfoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageInfoPayload>
          }
          deleteMany: {
            args: Prisma.PageInfoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PageInfoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PageInfoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PageInfoPayload>
          }
          aggregate: {
            args: Prisma.PageInfoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePageInfo>
          }
          groupBy: {
            args: Prisma.PageInfoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PageInfoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PageInfoCountArgs<ExtArgs>
            result: $Utils.Optional<PageInfoCountAggregateOutputType> | number
          }
        }
      }
      Menu: {
        payload: Prisma.$MenuPayload<ExtArgs>
        fields: Prisma.MenuFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MenuFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MenuFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          findFirst: {
            args: Prisma.MenuFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MenuFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          findMany: {
            args: Prisma.MenuFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>[]
          }
          create: {
            args: Prisma.MenuCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          createMany: {
            args: Prisma.MenuCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MenuDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          update: {
            args: Prisma.MenuUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          deleteMany: {
            args: Prisma.MenuDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MenuUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MenuUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          aggregate: {
            args: Prisma.MenuAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMenu>
          }
          groupBy: {
            args: Prisma.MenuGroupByArgs<ExtArgs>
            result: $Utils.Optional<MenuGroupByOutputType>[]
          }
          count: {
            args: Prisma.MenuCountArgs<ExtArgs>
            result: $Utils.Optional<MenuCountAggregateOutputType> | number
          }
        }
      }
      EvenementStress: {
        payload: Prisma.$EvenementStressPayload<ExtArgs>
        fields: Prisma.EvenementStressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EvenementStressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvenementStressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EvenementStressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvenementStressPayload>
          }
          findFirst: {
            args: Prisma.EvenementStressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvenementStressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EvenementStressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvenementStressPayload>
          }
          findMany: {
            args: Prisma.EvenementStressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvenementStressPayload>[]
          }
          create: {
            args: Prisma.EvenementStressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvenementStressPayload>
          }
          createMany: {
            args: Prisma.EvenementStressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EvenementStressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvenementStressPayload>
          }
          update: {
            args: Prisma.EvenementStressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvenementStressPayload>
          }
          deleteMany: {
            args: Prisma.EvenementStressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EvenementStressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EvenementStressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvenementStressPayload>
          }
          aggregate: {
            args: Prisma.EvenementStressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvenementStress>
          }
          groupBy: {
            args: Prisma.EvenementStressGroupByArgs<ExtArgs>
            result: $Utils.Optional<EvenementStressGroupByOutputType>[]
          }
          count: {
            args: Prisma.EvenementStressCountArgs<ExtArgs>
            result: $Utils.Optional<EvenementStressCountAggregateOutputType> | number
          }
        }
      }
      ResultatDiagnostic: {
        payload: Prisma.$ResultatDiagnosticPayload<ExtArgs>
        fields: Prisma.ResultatDiagnosticFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResultatDiagnosticFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultatDiagnosticPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResultatDiagnosticFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultatDiagnosticPayload>
          }
          findFirst: {
            args: Prisma.ResultatDiagnosticFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultatDiagnosticPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResultatDiagnosticFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultatDiagnosticPayload>
          }
          findMany: {
            args: Prisma.ResultatDiagnosticFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultatDiagnosticPayload>[]
          }
          create: {
            args: Prisma.ResultatDiagnosticCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultatDiagnosticPayload>
          }
          createMany: {
            args: Prisma.ResultatDiagnosticCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ResultatDiagnosticDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultatDiagnosticPayload>
          }
          update: {
            args: Prisma.ResultatDiagnosticUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultatDiagnosticPayload>
          }
          deleteMany: {
            args: Prisma.ResultatDiagnosticDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResultatDiagnosticUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ResultatDiagnosticUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultatDiagnosticPayload>
          }
          aggregate: {
            args: Prisma.ResultatDiagnosticAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResultatDiagnostic>
          }
          groupBy: {
            args: Prisma.ResultatDiagnosticGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResultatDiagnosticGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResultatDiagnosticCountArgs<ExtArgs>
            result: $Utils.Optional<ResultatDiagnosticCountAggregateOutputType> | number
          }
        }
      }
      ReponseDiagnostic: {
        payload: Prisma.$ReponseDiagnosticPayload<ExtArgs>
        fields: Prisma.ReponseDiagnosticFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReponseDiagnosticFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReponseDiagnosticPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReponseDiagnosticFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReponseDiagnosticPayload>
          }
          findFirst: {
            args: Prisma.ReponseDiagnosticFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReponseDiagnosticPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReponseDiagnosticFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReponseDiagnosticPayload>
          }
          findMany: {
            args: Prisma.ReponseDiagnosticFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReponseDiagnosticPayload>[]
          }
          create: {
            args: Prisma.ReponseDiagnosticCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReponseDiagnosticPayload>
          }
          createMany: {
            args: Prisma.ReponseDiagnosticCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ReponseDiagnosticDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReponseDiagnosticPayload>
          }
          update: {
            args: Prisma.ReponseDiagnosticUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReponseDiagnosticPayload>
          }
          deleteMany: {
            args: Prisma.ReponseDiagnosticDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReponseDiagnosticUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReponseDiagnosticUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReponseDiagnosticPayload>
          }
          aggregate: {
            args: Prisma.ReponseDiagnosticAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReponseDiagnostic>
          }
          groupBy: {
            args: Prisma.ReponseDiagnosticGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReponseDiagnosticGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReponseDiagnosticCountArgs<ExtArgs>
            result: $Utils.Optional<ReponseDiagnosticCountAggregateOutputType> | number
          }
        }
      }
      EmotionNiveau1: {
        payload: Prisma.$EmotionNiveau1Payload<ExtArgs>
        fields: Prisma.EmotionNiveau1FieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmotionNiveau1FindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmotionNiveau1Payload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmotionNiveau1FindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmotionNiveau1Payload>
          }
          findFirst: {
            args: Prisma.EmotionNiveau1FindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmotionNiveau1Payload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmotionNiveau1FindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmotionNiveau1Payload>
          }
          findMany: {
            args: Prisma.EmotionNiveau1FindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmotionNiveau1Payload>[]
          }
          create: {
            args: Prisma.EmotionNiveau1CreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmotionNiveau1Payload>
          }
          createMany: {
            args: Prisma.EmotionNiveau1CreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EmotionNiveau1DeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmotionNiveau1Payload>
          }
          update: {
            args: Prisma.EmotionNiveau1UpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmotionNiveau1Payload>
          }
          deleteMany: {
            args: Prisma.EmotionNiveau1DeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmotionNiveau1UpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EmotionNiveau1UpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmotionNiveau1Payload>
          }
          aggregate: {
            args: Prisma.EmotionNiveau1AggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmotionNiveau1>
          }
          groupBy: {
            args: Prisma.EmotionNiveau1GroupByArgs<ExtArgs>
            result: $Utils.Optional<EmotionNiveau1GroupByOutputType>[]
          }
          count: {
            args: Prisma.EmotionNiveau1CountArgs<ExtArgs>
            result: $Utils.Optional<EmotionNiveau1CountAggregateOutputType> | number
          }
        }
      }
      EmotionNiveau2: {
        payload: Prisma.$EmotionNiveau2Payload<ExtArgs>
        fields: Prisma.EmotionNiveau2FieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmotionNiveau2FindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmotionNiveau2Payload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmotionNiveau2FindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmotionNiveau2Payload>
          }
          findFirst: {
            args: Prisma.EmotionNiveau2FindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmotionNiveau2Payload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmotionNiveau2FindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmotionNiveau2Payload>
          }
          findMany: {
            args: Prisma.EmotionNiveau2FindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmotionNiveau2Payload>[]
          }
          create: {
            args: Prisma.EmotionNiveau2CreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmotionNiveau2Payload>
          }
          createMany: {
            args: Prisma.EmotionNiveau2CreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EmotionNiveau2DeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmotionNiveau2Payload>
          }
          update: {
            args: Prisma.EmotionNiveau2UpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmotionNiveau2Payload>
          }
          deleteMany: {
            args: Prisma.EmotionNiveau2DeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmotionNiveau2UpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EmotionNiveau2UpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmotionNiveau2Payload>
          }
          aggregate: {
            args: Prisma.EmotionNiveau2AggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmotionNiveau2>
          }
          groupBy: {
            args: Prisma.EmotionNiveau2GroupByArgs<ExtArgs>
            result: $Utils.Optional<EmotionNiveau2GroupByOutputType>[]
          }
          count: {
            args: Prisma.EmotionNiveau2CountArgs<ExtArgs>
            result: $Utils.Optional<EmotionNiveau2CountAggregateOutputType> | number
          }
        }
      }
      JournalEmotion: {
        payload: Prisma.$JournalEmotionPayload<ExtArgs>
        fields: Prisma.JournalEmotionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JournalEmotionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalEmotionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JournalEmotionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalEmotionPayload>
          }
          findFirst: {
            args: Prisma.JournalEmotionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalEmotionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JournalEmotionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalEmotionPayload>
          }
          findMany: {
            args: Prisma.JournalEmotionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalEmotionPayload>[]
          }
          create: {
            args: Prisma.JournalEmotionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalEmotionPayload>
          }
          createMany: {
            args: Prisma.JournalEmotionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.JournalEmotionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalEmotionPayload>
          }
          update: {
            args: Prisma.JournalEmotionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalEmotionPayload>
          }
          deleteMany: {
            args: Prisma.JournalEmotionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JournalEmotionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.JournalEmotionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalEmotionPayload>
          }
          aggregate: {
            args: Prisma.JournalEmotionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJournalEmotion>
          }
          groupBy: {
            args: Prisma.JournalEmotionGroupByArgs<ExtArgs>
            result: $Utils.Optional<JournalEmotionGroupByOutputType>[]
          }
          count: {
            args: Prisma.JournalEmotionCountArgs<ExtArgs>
            result: $Utils.Optional<JournalEmotionCountAggregateOutputType> | number
          }
        }
      }
      SupportTicket: {
        payload: Prisma.$SupportTicketPayload<ExtArgs>
        fields: Prisma.SupportTicketFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SupportTicketFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SupportTicketFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          findFirst: {
            args: Prisma.SupportTicketFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SupportTicketFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          findMany: {
            args: Prisma.SupportTicketFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>[]
          }
          create: {
            args: Prisma.SupportTicketCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          createMany: {
            args: Prisma.SupportTicketCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SupportTicketDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          update: {
            args: Prisma.SupportTicketUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          deleteMany: {
            args: Prisma.SupportTicketDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SupportTicketUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SupportTicketUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          aggregate: {
            args: Prisma.SupportTicketAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSupportTicket>
          }
          groupBy: {
            args: Prisma.SupportTicketGroupByArgs<ExtArgs>
            result: $Utils.Optional<SupportTicketGroupByOutputType>[]
          }
          count: {
            args: Prisma.SupportTicketCountArgs<ExtArgs>
            result: $Utils.Optional<SupportTicketCountAggregateOutputType> | number
          }
        }
      }
      ExerciceRespiration: {
        payload: Prisma.$ExerciceRespirationPayload<ExtArgs>
        fields: Prisma.ExerciceRespirationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExerciceRespirationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciceRespirationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExerciceRespirationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciceRespirationPayload>
          }
          findFirst: {
            args: Prisma.ExerciceRespirationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciceRespirationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExerciceRespirationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciceRespirationPayload>
          }
          findMany: {
            args: Prisma.ExerciceRespirationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciceRespirationPayload>[]
          }
          create: {
            args: Prisma.ExerciceRespirationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciceRespirationPayload>
          }
          createMany: {
            args: Prisma.ExerciceRespirationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ExerciceRespirationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciceRespirationPayload>
          }
          update: {
            args: Prisma.ExerciceRespirationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciceRespirationPayload>
          }
          deleteMany: {
            args: Prisma.ExerciceRespirationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExerciceRespirationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExerciceRespirationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciceRespirationPayload>
          }
          aggregate: {
            args: Prisma.ExerciceRespirationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExerciceRespiration>
          }
          groupBy: {
            args: Prisma.ExerciceRespirationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExerciceRespirationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExerciceRespirationCountArgs<ExtArgs>
            result: $Utils.Optional<ExerciceRespirationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    session?: SessionOmit
    account?: AccountOmit
    verification?: VerificationOmit
    pageInfo?: PageInfoOmit
    menu?: MenuOmit
    evenementStress?: EvenementStressOmit
    resultatDiagnostic?: ResultatDiagnosticOmit
    reponseDiagnostic?: ReponseDiagnosticOmit
    emotionNiveau1?: EmotionNiveau1Omit
    emotionNiveau2?: EmotionNiveau2Omit
    journalEmotion?: JournalEmotionOmit
    supportTicket?: SupportTicketOmit
    exerciceRespiration?: ExerciceRespirationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number
    accounts: number
    pagesRedigees: number
    resultatsDiagnostic: number
    journalEmotions: number
    supportTickets: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    pagesRedigees?: boolean | UserCountOutputTypeCountPagesRedigeesArgs
    resultatsDiagnostic?: boolean | UserCountOutputTypeCountResultatsDiagnosticArgs
    journalEmotions?: boolean | UserCountOutputTypeCountJournalEmotionsArgs
    supportTickets?: boolean | UserCountOutputTypeCountSupportTicketsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPagesRedigeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PageInfoWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountResultatsDiagnosticArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResultatDiagnosticWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountJournalEmotionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JournalEmotionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSupportTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupportTicketWhereInput
  }


  /**
   * Count Type EvenementStressCountOutputType
   */

  export type EvenementStressCountOutputType = {
    reponses: number
  }

  export type EvenementStressCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reponses?: boolean | EvenementStressCountOutputTypeCountReponsesArgs
  }

  // Custom InputTypes
  /**
   * EvenementStressCountOutputType without action
   */
  export type EvenementStressCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvenementStressCountOutputType
     */
    select?: EvenementStressCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EvenementStressCountOutputType without action
   */
  export type EvenementStressCountOutputTypeCountReponsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReponseDiagnosticWhereInput
  }


  /**
   * Count Type ResultatDiagnosticCountOutputType
   */

  export type ResultatDiagnosticCountOutputType = {
    reponses: number
  }

  export type ResultatDiagnosticCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reponses?: boolean | ResultatDiagnosticCountOutputTypeCountReponsesArgs
  }

  // Custom InputTypes
  /**
   * ResultatDiagnosticCountOutputType without action
   */
  export type ResultatDiagnosticCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResultatDiagnosticCountOutputType
     */
    select?: ResultatDiagnosticCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ResultatDiagnosticCountOutputType without action
   */
  export type ResultatDiagnosticCountOutputTypeCountReponsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReponseDiagnosticWhereInput
  }


  /**
   * Count Type EmotionNiveau1CountOutputType
   */

  export type EmotionNiveau1CountOutputType = {
    emotionsN2: number
  }

  export type EmotionNiveau1CountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emotionsN2?: boolean | EmotionNiveau1CountOutputTypeCountEmotionsN2Args
  }

  // Custom InputTypes
  /**
   * EmotionNiveau1CountOutputType without action
   */
  export type EmotionNiveau1CountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmotionNiveau1CountOutputType
     */
    select?: EmotionNiveau1CountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmotionNiveau1CountOutputType without action
   */
  export type EmotionNiveau1CountOutputTypeCountEmotionsN2Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmotionNiveau2WhereInput
  }


  /**
   * Count Type EmotionNiveau2CountOutputType
   */

  export type EmotionNiveau2CountOutputType = {
    journaux: number
  }

  export type EmotionNiveau2CountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    journaux?: boolean | EmotionNiveau2CountOutputTypeCountJournauxArgs
  }

  // Custom InputTypes
  /**
   * EmotionNiveau2CountOutputType without action
   */
  export type EmotionNiveau2CountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmotionNiveau2CountOutputType
     */
    select?: EmotionNiveau2CountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmotionNiveau2CountOutputType without action
   */
  export type EmotionNiveau2CountOutputTypeCountJournauxArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JournalEmotionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    age: number | null
  }

  export type UserSumAggregateOutputType = {
    age: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    firstName: string | null
    lastName: string | null
    age: number | null
    createdAt: Date | null
    updatedAt: Date | null
    role: $Enums.Role | null
    isActif: boolean | null
    dateConsentement: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    firstName: string | null
    lastName: string | null
    age: number | null
    createdAt: Date | null
    updatedAt: Date | null
    role: $Enums.Role | null
    isActif: boolean | null
    dateConsentement: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    firstName: number
    lastName: number
    age: number
    createdAt: number
    updatedAt: number
    role: number
    isActif: number
    dateConsentement: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    age?: true
  }

  export type UserSumAggregateInputType = {
    age?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    firstName?: true
    lastName?: true
    age?: true
    createdAt?: true
    updatedAt?: true
    role?: true
    isActif?: true
    dateConsentement?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    firstName?: true
    lastName?: true
    age?: true
    createdAt?: true
    updatedAt?: true
    role?: true
    isActif?: true
    dateConsentement?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    firstName?: true
    lastName?: true
    age?: true
    createdAt?: true
    updatedAt?: true
    role?: true
    isActif?: true
    dateConsentement?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image: string | null
    firstName: string
    lastName: string
    age: number | null
    createdAt: Date
    updatedAt: Date
    role: $Enums.Role
    isActif: boolean
    dateConsentement: Date | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    firstName?: boolean
    lastName?: boolean
    age?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    role?: boolean
    isActif?: boolean
    dateConsentement?: boolean
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    pagesRedigees?: boolean | User$pagesRedigeesArgs<ExtArgs>
    resultatsDiagnostic?: boolean | User$resultatsDiagnosticArgs<ExtArgs>
    journalEmotions?: boolean | User$journalEmotionsArgs<ExtArgs>
    supportTickets?: boolean | User$supportTicketsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    firstName?: boolean
    lastName?: boolean
    age?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    role?: boolean
    isActif?: boolean
    dateConsentement?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "firstName" | "lastName" | "age" | "createdAt" | "updatedAt" | "role" | "isActif" | "dateConsentement", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    pagesRedigees?: boolean | User$pagesRedigeesArgs<ExtArgs>
    resultatsDiagnostic?: boolean | User$resultatsDiagnosticArgs<ExtArgs>
    journalEmotions?: boolean | User$journalEmotionsArgs<ExtArgs>
    supportTickets?: boolean | User$supportTicketsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      pagesRedigees: Prisma.$PageInfoPayload<ExtArgs>[]
      resultatsDiagnostic: Prisma.$ResultatDiagnosticPayload<ExtArgs>[]
      journalEmotions: Prisma.$JournalEmotionPayload<ExtArgs>[]
      supportTickets: Prisma.$SupportTicketPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      emailVerified: boolean
      image: string | null
      firstName: string
      lastName: string
      age: number | null
      createdAt: Date
      updatedAt: Date
      role: $Enums.Role
      isActif: boolean
      dateConsentement: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pagesRedigees<T extends User$pagesRedigeesArgs<ExtArgs> = {}>(args?: Subset<T, User$pagesRedigeesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PageInfoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    resultatsDiagnostic<T extends User$resultatsDiagnosticArgs<ExtArgs> = {}>(args?: Subset<T, User$resultatsDiagnosticArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResultatDiagnosticPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    journalEmotions<T extends User$journalEmotionsArgs<ExtArgs> = {}>(args?: Subset<T, User$journalEmotionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JournalEmotionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    supportTickets<T extends User$supportTicketsArgs<ExtArgs> = {}>(args?: Subset<T, User$supportTicketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly image: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly age: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly role: FieldRef<"User", 'Role'>
    readonly isActif: FieldRef<"User", 'Boolean'>
    readonly dateConsentement: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.pagesRedigees
   */
  export type User$pagesRedigeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageInfo
     */
    select?: PageInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageInfo
     */
    omit?: PageInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInfoInclude<ExtArgs> | null
    where?: PageInfoWhereInput
    orderBy?: PageInfoOrderByWithRelationInput | PageInfoOrderByWithRelationInput[]
    cursor?: PageInfoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PageInfoScalarFieldEnum | PageInfoScalarFieldEnum[]
  }

  /**
   * User.resultatsDiagnostic
   */
  export type User$resultatsDiagnosticArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResultatDiagnostic
     */
    select?: ResultatDiagnosticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResultatDiagnostic
     */
    omit?: ResultatDiagnosticOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultatDiagnosticInclude<ExtArgs> | null
    where?: ResultatDiagnosticWhereInput
    orderBy?: ResultatDiagnosticOrderByWithRelationInput | ResultatDiagnosticOrderByWithRelationInput[]
    cursor?: ResultatDiagnosticWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResultatDiagnosticScalarFieldEnum | ResultatDiagnosticScalarFieldEnum[]
  }

  /**
   * User.journalEmotions
   */
  export type User$journalEmotionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEmotion
     */
    select?: JournalEmotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEmotion
     */
    omit?: JournalEmotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEmotionInclude<ExtArgs> | null
    where?: JournalEmotionWhereInput
    orderBy?: JournalEmotionOrderByWithRelationInput | JournalEmotionOrderByWithRelationInput[]
    cursor?: JournalEmotionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JournalEmotionScalarFieldEnum | JournalEmotionScalarFieldEnum[]
  }

  /**
   * User.supportTickets
   */
  export type User$supportTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    where?: SupportTicketWhereInput
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    cursor?: SupportTicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SupportTicketScalarFieldEnum | SupportTicketScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    expiresAt: number
    token: number
    createdAt: number
    updatedAt: number
    ipAddress: number
    userAgent: number
    userId: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    expiresAt: Date
    token: string
    createdAt: Date
    updatedAt: Date
    ipAddress: string | null
    userAgent: string | null
    userId: string
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>



  export type SessionSelectScalar = {
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "expiresAt" | "token" | "createdAt" | "updatedAt" | "ipAddress" | "userAgent" | "userId", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      expiresAt: Date
      token: string
      createdAt: Date
      updatedAt: Date
      ipAddress: string | null
      userAgent: string | null
      userId: string
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly token: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
    readonly ipAddress: FieldRef<"Session", 'String'>
    readonly userAgent: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    accountId: number
    providerId: number
    userId: number
    accessToken: number
    refreshToken: number
    idToken: number
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
    scope: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>



  export type AccountSelectScalar = {
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accountId" | "providerId" | "userId" | "accessToken" | "refreshToken" | "idToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt" | "scope" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountId: string
      providerId: string
      userId: string
      accessToken: string | null
      refreshToken: string | null
      idToken: string | null
      accessTokenExpiresAt: Date | null
      refreshTokenExpiresAt: Date | null
      scope: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly accountId: FieldRef<"Account", 'String'>
    readonly providerId: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly accessToken: FieldRef<"Account", 'String'>
    readonly refreshToken: FieldRef<"Account", 'String'>
    readonly idToken: FieldRef<"Account", 'String'>
    readonly accessTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly refreshTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly password: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Verification
   */

  export type AggregateVerification = {
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  export type VerificationMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationCountAggregateOutputType = {
    id: number
    identifier: number
    value: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationMinAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationMaxAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationCountAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verification to aggregate.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Verifications
    **/
    _count?: true | VerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationMaxAggregateInputType
  }

  export type GetVerificationAggregateType<T extends VerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>
  }




  export type VerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationWhereInput
    orderBy?: VerificationOrderByWithAggregationInput | VerificationOrderByWithAggregationInput[]
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum
    having?: VerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationCountAggregateInputType | true
    _min?: VerificationMinAggregateInputType
    _max?: VerificationMaxAggregateInputType
  }

  export type VerificationGroupByOutputType = {
    id: string
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  type GetVerificationGroupByPayload<T extends VerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>
        }
      >
    >


  export type VerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>



  export type VerificationSelectScalar = {
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifier" | "value" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["verification"]>

  export type $VerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Verification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      value: string
      expiresAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["verification"]>
    composites: {}
  }

  type VerificationGetPayload<S extends boolean | null | undefined | VerificationDefaultArgs> = $Result.GetResult<Prisma.$VerificationPayload, S>

  type VerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationCountAggregateInputType | true
    }

  export interface VerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Verification'], meta: { name: 'Verification' } }
    /**
     * Find zero or one Verification that matches the filter.
     * @param {VerificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationFindUniqueArgs>(args: SelectSubset<T, VerificationFindUniqueArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationFindFirstArgs>(args?: SelectSubset<T, VerificationFindFirstArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     * 
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationFindManyArgs>(args?: SelectSubset<T, VerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Verification.
     * @param {VerificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     * 
     */
    create<T extends VerificationCreateArgs>(args: SelectSubset<T, VerificationCreateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Verifications.
     * @param {VerificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationCreateManyArgs>(args?: SelectSubset<T, VerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Verification.
     * @param {VerificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     * 
     */
    delete<T extends VerificationDeleteArgs>(args: SelectSubset<T, VerificationDeleteArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Verification.
     * @param {VerificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationUpdateArgs>(args: SelectSubset<T, VerificationUpdateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Verifications.
     * @param {VerificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationDeleteManyArgs>(args?: SelectSubset<T, VerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationUpdateManyArgs>(args: SelectSubset<T, VerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Verification.
     * @param {VerificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends VerificationUpsertArgs>(args: SelectSubset<T, VerificationUpsertArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
    **/
    count<T extends VerificationCountArgs>(
      args?: Subset<T, VerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationAggregateArgs>(args: Subset<T, VerificationAggregateArgs>): Prisma.PrismaPromise<GetVerificationAggregateType<T>>

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationGroupByArgs['orderBy'] }
        : { orderBy?: VerificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Verification model
   */
  readonly fields: VerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Verification model
   */
  interface VerificationFieldRefs {
    readonly id: FieldRef<"Verification", 'String'>
    readonly identifier: FieldRef<"Verification", 'String'>
    readonly value: FieldRef<"Verification", 'String'>
    readonly expiresAt: FieldRef<"Verification", 'DateTime'>
    readonly createdAt: FieldRef<"Verification", 'DateTime'>
    readonly updatedAt: FieldRef<"Verification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Verification findUnique
   */
  export type VerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findUniqueOrThrow
   */
  export type VerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findFirst
   */
  export type VerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findFirstOrThrow
   */
  export type VerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findMany
   */
  export type VerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verifications to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification create
   */
  export type VerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Verification.
     */
    data: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
  }

  /**
   * Verification createMany
   */
  export type VerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification update
   */
  export type VerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Verification.
     */
    data: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
    /**
     * Choose, which Verification to update.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification updateMany
   */
  export type VerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification upsert
   */
  export type VerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Verification to update in case it exists.
     */
    where: VerificationWhereUniqueInput
    /**
     * In case the Verification found by the `where` argument doesn't exist, create a new Verification with this data.
     */
    create: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
    /**
     * In case the Verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
  }

  /**
   * Verification delete
   */
  export type VerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter which Verification to delete.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification deleteMany
   */
  export type VerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verifications to delete
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to delete.
     */
    limit?: number
  }

  /**
   * Verification without action
   */
  export type VerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
  }


  /**
   * Model PageInfo
   */

  export type AggregatePageInfo = {
    _count: PageInfoCountAggregateOutputType | null
    _min: PageInfoMinAggregateOutputType | null
    _max: PageInfoMaxAggregateOutputType | null
  }

  export type PageInfoMinAggregateOutputType = {
    id: string | null
    titre: string | null
    slug: string | null
    contenu: string | null
    dateCreation: Date | null
    dateMaj: Date | null
    isPublie: boolean | null
    auteurId: string | null
  }

  export type PageInfoMaxAggregateOutputType = {
    id: string | null
    titre: string | null
    slug: string | null
    contenu: string | null
    dateCreation: Date | null
    dateMaj: Date | null
    isPublie: boolean | null
    auteurId: string | null
  }

  export type PageInfoCountAggregateOutputType = {
    id: number
    titre: number
    slug: number
    contenu: number
    dateCreation: number
    dateMaj: number
    isPublie: number
    auteurId: number
    _all: number
  }


  export type PageInfoMinAggregateInputType = {
    id?: true
    titre?: true
    slug?: true
    contenu?: true
    dateCreation?: true
    dateMaj?: true
    isPublie?: true
    auteurId?: true
  }

  export type PageInfoMaxAggregateInputType = {
    id?: true
    titre?: true
    slug?: true
    contenu?: true
    dateCreation?: true
    dateMaj?: true
    isPublie?: true
    auteurId?: true
  }

  export type PageInfoCountAggregateInputType = {
    id?: true
    titre?: true
    slug?: true
    contenu?: true
    dateCreation?: true
    dateMaj?: true
    isPublie?: true
    auteurId?: true
    _all?: true
  }

  export type PageInfoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PageInfo to aggregate.
     */
    where?: PageInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PageInfos to fetch.
     */
    orderBy?: PageInfoOrderByWithRelationInput | PageInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PageInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PageInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PageInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PageInfos
    **/
    _count?: true | PageInfoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PageInfoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PageInfoMaxAggregateInputType
  }

  export type GetPageInfoAggregateType<T extends PageInfoAggregateArgs> = {
        [P in keyof T & keyof AggregatePageInfo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePageInfo[P]>
      : GetScalarType<T[P], AggregatePageInfo[P]>
  }




  export type PageInfoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PageInfoWhereInput
    orderBy?: PageInfoOrderByWithAggregationInput | PageInfoOrderByWithAggregationInput[]
    by: PageInfoScalarFieldEnum[] | PageInfoScalarFieldEnum
    having?: PageInfoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PageInfoCountAggregateInputType | true
    _min?: PageInfoMinAggregateInputType
    _max?: PageInfoMaxAggregateInputType
  }

  export type PageInfoGroupByOutputType = {
    id: string
    titre: string
    slug: string
    contenu: string
    dateCreation: Date
    dateMaj: Date
    isPublie: boolean
    auteurId: string
    _count: PageInfoCountAggregateOutputType | null
    _min: PageInfoMinAggregateOutputType | null
    _max: PageInfoMaxAggregateOutputType | null
  }

  type GetPageInfoGroupByPayload<T extends PageInfoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PageInfoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PageInfoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PageInfoGroupByOutputType[P]>
            : GetScalarType<T[P], PageInfoGroupByOutputType[P]>
        }
      >
    >


  export type PageInfoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titre?: boolean
    slug?: boolean
    contenu?: boolean
    dateCreation?: boolean
    dateMaj?: boolean
    isPublie?: boolean
    auteurId?: boolean
    auteur?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pageInfo"]>



  export type PageInfoSelectScalar = {
    id?: boolean
    titre?: boolean
    slug?: boolean
    contenu?: boolean
    dateCreation?: boolean
    dateMaj?: boolean
    isPublie?: boolean
    auteurId?: boolean
  }

  export type PageInfoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "titre" | "slug" | "contenu" | "dateCreation" | "dateMaj" | "isPublie" | "auteurId", ExtArgs["result"]["pageInfo"]>
  export type PageInfoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auteur?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PageInfoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PageInfo"
    objects: {
      auteur: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      titre: string
      slug: string
      contenu: string
      dateCreation: Date
      dateMaj: Date
      isPublie: boolean
      auteurId: string
    }, ExtArgs["result"]["pageInfo"]>
    composites: {}
  }

  type PageInfoGetPayload<S extends boolean | null | undefined | PageInfoDefaultArgs> = $Result.GetResult<Prisma.$PageInfoPayload, S>

  type PageInfoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PageInfoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PageInfoCountAggregateInputType | true
    }

  export interface PageInfoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PageInfo'], meta: { name: 'PageInfo' } }
    /**
     * Find zero or one PageInfo that matches the filter.
     * @param {PageInfoFindUniqueArgs} args - Arguments to find a PageInfo
     * @example
     * // Get one PageInfo
     * const pageInfo = await prisma.pageInfo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PageInfoFindUniqueArgs>(args: SelectSubset<T, PageInfoFindUniqueArgs<ExtArgs>>): Prisma__PageInfoClient<$Result.GetResult<Prisma.$PageInfoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PageInfo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PageInfoFindUniqueOrThrowArgs} args - Arguments to find a PageInfo
     * @example
     * // Get one PageInfo
     * const pageInfo = await prisma.pageInfo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PageInfoFindUniqueOrThrowArgs>(args: SelectSubset<T, PageInfoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PageInfoClient<$Result.GetResult<Prisma.$PageInfoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PageInfo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageInfoFindFirstArgs} args - Arguments to find a PageInfo
     * @example
     * // Get one PageInfo
     * const pageInfo = await prisma.pageInfo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PageInfoFindFirstArgs>(args?: SelectSubset<T, PageInfoFindFirstArgs<ExtArgs>>): Prisma__PageInfoClient<$Result.GetResult<Prisma.$PageInfoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PageInfo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageInfoFindFirstOrThrowArgs} args - Arguments to find a PageInfo
     * @example
     * // Get one PageInfo
     * const pageInfo = await prisma.pageInfo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PageInfoFindFirstOrThrowArgs>(args?: SelectSubset<T, PageInfoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PageInfoClient<$Result.GetResult<Prisma.$PageInfoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PageInfos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageInfoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PageInfos
     * const pageInfos = await prisma.pageInfo.findMany()
     * 
     * // Get first 10 PageInfos
     * const pageInfos = await prisma.pageInfo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pageInfoWithIdOnly = await prisma.pageInfo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PageInfoFindManyArgs>(args?: SelectSubset<T, PageInfoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PageInfoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PageInfo.
     * @param {PageInfoCreateArgs} args - Arguments to create a PageInfo.
     * @example
     * // Create one PageInfo
     * const PageInfo = await prisma.pageInfo.create({
     *   data: {
     *     // ... data to create a PageInfo
     *   }
     * })
     * 
     */
    create<T extends PageInfoCreateArgs>(args: SelectSubset<T, PageInfoCreateArgs<ExtArgs>>): Prisma__PageInfoClient<$Result.GetResult<Prisma.$PageInfoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PageInfos.
     * @param {PageInfoCreateManyArgs} args - Arguments to create many PageInfos.
     * @example
     * // Create many PageInfos
     * const pageInfo = await prisma.pageInfo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PageInfoCreateManyArgs>(args?: SelectSubset<T, PageInfoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PageInfo.
     * @param {PageInfoDeleteArgs} args - Arguments to delete one PageInfo.
     * @example
     * // Delete one PageInfo
     * const PageInfo = await prisma.pageInfo.delete({
     *   where: {
     *     // ... filter to delete one PageInfo
     *   }
     * })
     * 
     */
    delete<T extends PageInfoDeleteArgs>(args: SelectSubset<T, PageInfoDeleteArgs<ExtArgs>>): Prisma__PageInfoClient<$Result.GetResult<Prisma.$PageInfoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PageInfo.
     * @param {PageInfoUpdateArgs} args - Arguments to update one PageInfo.
     * @example
     * // Update one PageInfo
     * const pageInfo = await prisma.pageInfo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PageInfoUpdateArgs>(args: SelectSubset<T, PageInfoUpdateArgs<ExtArgs>>): Prisma__PageInfoClient<$Result.GetResult<Prisma.$PageInfoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PageInfos.
     * @param {PageInfoDeleteManyArgs} args - Arguments to filter PageInfos to delete.
     * @example
     * // Delete a few PageInfos
     * const { count } = await prisma.pageInfo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PageInfoDeleteManyArgs>(args?: SelectSubset<T, PageInfoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PageInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageInfoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PageInfos
     * const pageInfo = await prisma.pageInfo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PageInfoUpdateManyArgs>(args: SelectSubset<T, PageInfoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PageInfo.
     * @param {PageInfoUpsertArgs} args - Arguments to update or create a PageInfo.
     * @example
     * // Update or create a PageInfo
     * const pageInfo = await prisma.pageInfo.upsert({
     *   create: {
     *     // ... data to create a PageInfo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PageInfo we want to update
     *   }
     * })
     */
    upsert<T extends PageInfoUpsertArgs>(args: SelectSubset<T, PageInfoUpsertArgs<ExtArgs>>): Prisma__PageInfoClient<$Result.GetResult<Prisma.$PageInfoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PageInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageInfoCountArgs} args - Arguments to filter PageInfos to count.
     * @example
     * // Count the number of PageInfos
     * const count = await prisma.pageInfo.count({
     *   where: {
     *     // ... the filter for the PageInfos we want to count
     *   }
     * })
    **/
    count<T extends PageInfoCountArgs>(
      args?: Subset<T, PageInfoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PageInfoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PageInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageInfoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PageInfoAggregateArgs>(args: Subset<T, PageInfoAggregateArgs>): Prisma.PrismaPromise<GetPageInfoAggregateType<T>>

    /**
     * Group by PageInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageInfoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PageInfoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PageInfoGroupByArgs['orderBy'] }
        : { orderBy?: PageInfoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PageInfoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPageInfoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PageInfo model
   */
  readonly fields: PageInfoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PageInfo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PageInfoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    auteur<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PageInfo model
   */
  interface PageInfoFieldRefs {
    readonly id: FieldRef<"PageInfo", 'String'>
    readonly titre: FieldRef<"PageInfo", 'String'>
    readonly slug: FieldRef<"PageInfo", 'String'>
    readonly contenu: FieldRef<"PageInfo", 'String'>
    readonly dateCreation: FieldRef<"PageInfo", 'DateTime'>
    readonly dateMaj: FieldRef<"PageInfo", 'DateTime'>
    readonly isPublie: FieldRef<"PageInfo", 'Boolean'>
    readonly auteurId: FieldRef<"PageInfo", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PageInfo findUnique
   */
  export type PageInfoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageInfo
     */
    select?: PageInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageInfo
     */
    omit?: PageInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInfoInclude<ExtArgs> | null
    /**
     * Filter, which PageInfo to fetch.
     */
    where: PageInfoWhereUniqueInput
  }

  /**
   * PageInfo findUniqueOrThrow
   */
  export type PageInfoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageInfo
     */
    select?: PageInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageInfo
     */
    omit?: PageInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInfoInclude<ExtArgs> | null
    /**
     * Filter, which PageInfo to fetch.
     */
    where: PageInfoWhereUniqueInput
  }

  /**
   * PageInfo findFirst
   */
  export type PageInfoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageInfo
     */
    select?: PageInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageInfo
     */
    omit?: PageInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInfoInclude<ExtArgs> | null
    /**
     * Filter, which PageInfo to fetch.
     */
    where?: PageInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PageInfos to fetch.
     */
    orderBy?: PageInfoOrderByWithRelationInput | PageInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PageInfos.
     */
    cursor?: PageInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PageInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PageInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PageInfos.
     */
    distinct?: PageInfoScalarFieldEnum | PageInfoScalarFieldEnum[]
  }

  /**
   * PageInfo findFirstOrThrow
   */
  export type PageInfoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageInfo
     */
    select?: PageInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageInfo
     */
    omit?: PageInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInfoInclude<ExtArgs> | null
    /**
     * Filter, which PageInfo to fetch.
     */
    where?: PageInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PageInfos to fetch.
     */
    orderBy?: PageInfoOrderByWithRelationInput | PageInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PageInfos.
     */
    cursor?: PageInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PageInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PageInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PageInfos.
     */
    distinct?: PageInfoScalarFieldEnum | PageInfoScalarFieldEnum[]
  }

  /**
   * PageInfo findMany
   */
  export type PageInfoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageInfo
     */
    select?: PageInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageInfo
     */
    omit?: PageInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInfoInclude<ExtArgs> | null
    /**
     * Filter, which PageInfos to fetch.
     */
    where?: PageInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PageInfos to fetch.
     */
    orderBy?: PageInfoOrderByWithRelationInput | PageInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PageInfos.
     */
    cursor?: PageInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PageInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PageInfos.
     */
    skip?: number
    distinct?: PageInfoScalarFieldEnum | PageInfoScalarFieldEnum[]
  }

  /**
   * PageInfo create
   */
  export type PageInfoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageInfo
     */
    select?: PageInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageInfo
     */
    omit?: PageInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInfoInclude<ExtArgs> | null
    /**
     * The data needed to create a PageInfo.
     */
    data: XOR<PageInfoCreateInput, PageInfoUncheckedCreateInput>
  }

  /**
   * PageInfo createMany
   */
  export type PageInfoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PageInfos.
     */
    data: PageInfoCreateManyInput | PageInfoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PageInfo update
   */
  export type PageInfoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageInfo
     */
    select?: PageInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageInfo
     */
    omit?: PageInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInfoInclude<ExtArgs> | null
    /**
     * The data needed to update a PageInfo.
     */
    data: XOR<PageInfoUpdateInput, PageInfoUncheckedUpdateInput>
    /**
     * Choose, which PageInfo to update.
     */
    where: PageInfoWhereUniqueInput
  }

  /**
   * PageInfo updateMany
   */
  export type PageInfoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PageInfos.
     */
    data: XOR<PageInfoUpdateManyMutationInput, PageInfoUncheckedUpdateManyInput>
    /**
     * Filter which PageInfos to update
     */
    where?: PageInfoWhereInput
    /**
     * Limit how many PageInfos to update.
     */
    limit?: number
  }

  /**
   * PageInfo upsert
   */
  export type PageInfoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageInfo
     */
    select?: PageInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageInfo
     */
    omit?: PageInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInfoInclude<ExtArgs> | null
    /**
     * The filter to search for the PageInfo to update in case it exists.
     */
    where: PageInfoWhereUniqueInput
    /**
     * In case the PageInfo found by the `where` argument doesn't exist, create a new PageInfo with this data.
     */
    create: XOR<PageInfoCreateInput, PageInfoUncheckedCreateInput>
    /**
     * In case the PageInfo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PageInfoUpdateInput, PageInfoUncheckedUpdateInput>
  }

  /**
   * PageInfo delete
   */
  export type PageInfoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageInfo
     */
    select?: PageInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageInfo
     */
    omit?: PageInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInfoInclude<ExtArgs> | null
    /**
     * Filter which PageInfo to delete.
     */
    where: PageInfoWhereUniqueInput
  }

  /**
   * PageInfo deleteMany
   */
  export type PageInfoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PageInfos to delete
     */
    where?: PageInfoWhereInput
    /**
     * Limit how many PageInfos to delete.
     */
    limit?: number
  }

  /**
   * PageInfo without action
   */
  export type PageInfoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageInfo
     */
    select?: PageInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PageInfo
     */
    omit?: PageInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInfoInclude<ExtArgs> | null
  }


  /**
   * Model Menu
   */

  export type AggregateMenu = {
    _count: MenuCountAggregateOutputType | null
    _avg: MenuAvgAggregateOutputType | null
    _sum: MenuSumAggregateOutputType | null
    _min: MenuMinAggregateOutputType | null
    _max: MenuMaxAggregateOutputType | null
  }

  export type MenuAvgAggregateOutputType = {
    ordreAffichage: number | null
  }

  export type MenuSumAggregateOutputType = {
    ordreAffichage: number | null
  }

  export type MenuMinAggregateOutputType = {
    id: string | null
    label: string | null
    url: string | null
    ordreAffichage: number | null
  }

  export type MenuMaxAggregateOutputType = {
    id: string | null
    label: string | null
    url: string | null
    ordreAffichage: number | null
  }

  export type MenuCountAggregateOutputType = {
    id: number
    label: number
    url: number
    ordreAffichage: number
    _all: number
  }


  export type MenuAvgAggregateInputType = {
    ordreAffichage?: true
  }

  export type MenuSumAggregateInputType = {
    ordreAffichage?: true
  }

  export type MenuMinAggregateInputType = {
    id?: true
    label?: true
    url?: true
    ordreAffichage?: true
  }

  export type MenuMaxAggregateInputType = {
    id?: true
    label?: true
    url?: true
    ordreAffichage?: true
  }

  export type MenuCountAggregateInputType = {
    id?: true
    label?: true
    url?: true
    ordreAffichage?: true
    _all?: true
  }

  export type MenuAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Menu to aggregate.
     */
    where?: MenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Menus to fetch.
     */
    orderBy?: MenuOrderByWithRelationInput | MenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Menus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Menus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Menus
    **/
    _count?: true | MenuCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MenuAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MenuSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MenuMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MenuMaxAggregateInputType
  }

  export type GetMenuAggregateType<T extends MenuAggregateArgs> = {
        [P in keyof T & keyof AggregateMenu]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMenu[P]>
      : GetScalarType<T[P], AggregateMenu[P]>
  }




  export type MenuGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MenuWhereInput
    orderBy?: MenuOrderByWithAggregationInput | MenuOrderByWithAggregationInput[]
    by: MenuScalarFieldEnum[] | MenuScalarFieldEnum
    having?: MenuScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MenuCountAggregateInputType | true
    _avg?: MenuAvgAggregateInputType
    _sum?: MenuSumAggregateInputType
    _min?: MenuMinAggregateInputType
    _max?: MenuMaxAggregateInputType
  }

  export type MenuGroupByOutputType = {
    id: string
    label: string
    url: string
    ordreAffichage: number
    _count: MenuCountAggregateOutputType | null
    _avg: MenuAvgAggregateOutputType | null
    _sum: MenuSumAggregateOutputType | null
    _min: MenuMinAggregateOutputType | null
    _max: MenuMaxAggregateOutputType | null
  }

  type GetMenuGroupByPayload<T extends MenuGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MenuGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MenuGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MenuGroupByOutputType[P]>
            : GetScalarType<T[P], MenuGroupByOutputType[P]>
        }
      >
    >


  export type MenuSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    label?: boolean
    url?: boolean
    ordreAffichage?: boolean
  }, ExtArgs["result"]["menu"]>



  export type MenuSelectScalar = {
    id?: boolean
    label?: boolean
    url?: boolean
    ordreAffichage?: boolean
  }

  export type MenuOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "label" | "url" | "ordreAffichage", ExtArgs["result"]["menu"]>

  export type $MenuPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Menu"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      label: string
      url: string
      ordreAffichage: number
    }, ExtArgs["result"]["menu"]>
    composites: {}
  }

  type MenuGetPayload<S extends boolean | null | undefined | MenuDefaultArgs> = $Result.GetResult<Prisma.$MenuPayload, S>

  type MenuCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MenuFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MenuCountAggregateInputType | true
    }

  export interface MenuDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Menu'], meta: { name: 'Menu' } }
    /**
     * Find zero or one Menu that matches the filter.
     * @param {MenuFindUniqueArgs} args - Arguments to find a Menu
     * @example
     * // Get one Menu
     * const menu = await prisma.menu.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MenuFindUniqueArgs>(args: SelectSubset<T, MenuFindUniqueArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Menu that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MenuFindUniqueOrThrowArgs} args - Arguments to find a Menu
     * @example
     * // Get one Menu
     * const menu = await prisma.menu.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MenuFindUniqueOrThrowArgs>(args: SelectSubset<T, MenuFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Menu that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuFindFirstArgs} args - Arguments to find a Menu
     * @example
     * // Get one Menu
     * const menu = await prisma.menu.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MenuFindFirstArgs>(args?: SelectSubset<T, MenuFindFirstArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Menu that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuFindFirstOrThrowArgs} args - Arguments to find a Menu
     * @example
     * // Get one Menu
     * const menu = await prisma.menu.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MenuFindFirstOrThrowArgs>(args?: SelectSubset<T, MenuFindFirstOrThrowArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Menus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Menus
     * const menus = await prisma.menu.findMany()
     * 
     * // Get first 10 Menus
     * const menus = await prisma.menu.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const menuWithIdOnly = await prisma.menu.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MenuFindManyArgs>(args?: SelectSubset<T, MenuFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Menu.
     * @param {MenuCreateArgs} args - Arguments to create a Menu.
     * @example
     * // Create one Menu
     * const Menu = await prisma.menu.create({
     *   data: {
     *     // ... data to create a Menu
     *   }
     * })
     * 
     */
    create<T extends MenuCreateArgs>(args: SelectSubset<T, MenuCreateArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Menus.
     * @param {MenuCreateManyArgs} args - Arguments to create many Menus.
     * @example
     * // Create many Menus
     * const menu = await prisma.menu.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MenuCreateManyArgs>(args?: SelectSubset<T, MenuCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Menu.
     * @param {MenuDeleteArgs} args - Arguments to delete one Menu.
     * @example
     * // Delete one Menu
     * const Menu = await prisma.menu.delete({
     *   where: {
     *     // ... filter to delete one Menu
     *   }
     * })
     * 
     */
    delete<T extends MenuDeleteArgs>(args: SelectSubset<T, MenuDeleteArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Menu.
     * @param {MenuUpdateArgs} args - Arguments to update one Menu.
     * @example
     * // Update one Menu
     * const menu = await prisma.menu.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MenuUpdateArgs>(args: SelectSubset<T, MenuUpdateArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Menus.
     * @param {MenuDeleteManyArgs} args - Arguments to filter Menus to delete.
     * @example
     * // Delete a few Menus
     * const { count } = await prisma.menu.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MenuDeleteManyArgs>(args?: SelectSubset<T, MenuDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Menus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Menus
     * const menu = await prisma.menu.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MenuUpdateManyArgs>(args: SelectSubset<T, MenuUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Menu.
     * @param {MenuUpsertArgs} args - Arguments to update or create a Menu.
     * @example
     * // Update or create a Menu
     * const menu = await prisma.menu.upsert({
     *   create: {
     *     // ... data to create a Menu
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Menu we want to update
     *   }
     * })
     */
    upsert<T extends MenuUpsertArgs>(args: SelectSubset<T, MenuUpsertArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Menus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuCountArgs} args - Arguments to filter Menus to count.
     * @example
     * // Count the number of Menus
     * const count = await prisma.menu.count({
     *   where: {
     *     // ... the filter for the Menus we want to count
     *   }
     * })
    **/
    count<T extends MenuCountArgs>(
      args?: Subset<T, MenuCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MenuCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Menu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MenuAggregateArgs>(args: Subset<T, MenuAggregateArgs>): Prisma.PrismaPromise<GetMenuAggregateType<T>>

    /**
     * Group by Menu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MenuGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MenuGroupByArgs['orderBy'] }
        : { orderBy?: MenuGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MenuGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMenuGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Menu model
   */
  readonly fields: MenuFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Menu.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MenuClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Menu model
   */
  interface MenuFieldRefs {
    readonly id: FieldRef<"Menu", 'String'>
    readonly label: FieldRef<"Menu", 'String'>
    readonly url: FieldRef<"Menu", 'String'>
    readonly ordreAffichage: FieldRef<"Menu", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Menu findUnique
   */
  export type MenuFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Filter, which Menu to fetch.
     */
    where: MenuWhereUniqueInput
  }

  /**
   * Menu findUniqueOrThrow
   */
  export type MenuFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Filter, which Menu to fetch.
     */
    where: MenuWhereUniqueInput
  }

  /**
   * Menu findFirst
   */
  export type MenuFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Filter, which Menu to fetch.
     */
    where?: MenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Menus to fetch.
     */
    orderBy?: MenuOrderByWithRelationInput | MenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Menus.
     */
    cursor?: MenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Menus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Menus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Menus.
     */
    distinct?: MenuScalarFieldEnum | MenuScalarFieldEnum[]
  }

  /**
   * Menu findFirstOrThrow
   */
  export type MenuFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Filter, which Menu to fetch.
     */
    where?: MenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Menus to fetch.
     */
    orderBy?: MenuOrderByWithRelationInput | MenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Menus.
     */
    cursor?: MenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Menus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Menus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Menus.
     */
    distinct?: MenuScalarFieldEnum | MenuScalarFieldEnum[]
  }

  /**
   * Menu findMany
   */
  export type MenuFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Filter, which Menus to fetch.
     */
    where?: MenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Menus to fetch.
     */
    orderBy?: MenuOrderByWithRelationInput | MenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Menus.
     */
    cursor?: MenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Menus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Menus.
     */
    skip?: number
    distinct?: MenuScalarFieldEnum | MenuScalarFieldEnum[]
  }

  /**
   * Menu create
   */
  export type MenuCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * The data needed to create a Menu.
     */
    data: XOR<MenuCreateInput, MenuUncheckedCreateInput>
  }

  /**
   * Menu createMany
   */
  export type MenuCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Menus.
     */
    data: MenuCreateManyInput | MenuCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Menu update
   */
  export type MenuUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * The data needed to update a Menu.
     */
    data: XOR<MenuUpdateInput, MenuUncheckedUpdateInput>
    /**
     * Choose, which Menu to update.
     */
    where: MenuWhereUniqueInput
  }

  /**
   * Menu updateMany
   */
  export type MenuUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Menus.
     */
    data: XOR<MenuUpdateManyMutationInput, MenuUncheckedUpdateManyInput>
    /**
     * Filter which Menus to update
     */
    where?: MenuWhereInput
    /**
     * Limit how many Menus to update.
     */
    limit?: number
  }

  /**
   * Menu upsert
   */
  export type MenuUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * The filter to search for the Menu to update in case it exists.
     */
    where: MenuWhereUniqueInput
    /**
     * In case the Menu found by the `where` argument doesn't exist, create a new Menu with this data.
     */
    create: XOR<MenuCreateInput, MenuUncheckedCreateInput>
    /**
     * In case the Menu was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MenuUpdateInput, MenuUncheckedUpdateInput>
  }

  /**
   * Menu delete
   */
  export type MenuDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
    /**
     * Filter which Menu to delete.
     */
    where: MenuWhereUniqueInput
  }

  /**
   * Menu deleteMany
   */
  export type MenuDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Menus to delete
     */
    where?: MenuWhereInput
    /**
     * Limit how many Menus to delete.
     */
    limit?: number
  }

  /**
   * Menu without action
   */
  export type MenuDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menu
     */
    omit?: MenuOmit<ExtArgs> | null
  }


  /**
   * Model EvenementStress
   */

  export type AggregateEvenementStress = {
    _count: EvenementStressCountAggregateOutputType | null
    _avg: EvenementStressAvgAggregateOutputType | null
    _sum: EvenementStressSumAggregateOutputType | null
    _min: EvenementStressMinAggregateOutputType | null
    _max: EvenementStressMaxAggregateOutputType | null
  }

  export type EvenementStressAvgAggregateOutputType = {
    points: number | null
  }

  export type EvenementStressSumAggregateOutputType = {
    points: number | null
  }

  export type EvenementStressMinAggregateOutputType = {
    id: string | null
    description: string | null
    points: number | null
    isActif: boolean | null
  }

  export type EvenementStressMaxAggregateOutputType = {
    id: string | null
    description: string | null
    points: number | null
    isActif: boolean | null
  }

  export type EvenementStressCountAggregateOutputType = {
    id: number
    description: number
    points: number
    isActif: number
    _all: number
  }


  export type EvenementStressAvgAggregateInputType = {
    points?: true
  }

  export type EvenementStressSumAggregateInputType = {
    points?: true
  }

  export type EvenementStressMinAggregateInputType = {
    id?: true
    description?: true
    points?: true
    isActif?: true
  }

  export type EvenementStressMaxAggregateInputType = {
    id?: true
    description?: true
    points?: true
    isActif?: true
  }

  export type EvenementStressCountAggregateInputType = {
    id?: true
    description?: true
    points?: true
    isActif?: true
    _all?: true
  }

  export type EvenementStressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EvenementStress to aggregate.
     */
    where?: EvenementStressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvenementStresses to fetch.
     */
    orderBy?: EvenementStressOrderByWithRelationInput | EvenementStressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EvenementStressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvenementStresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvenementStresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EvenementStresses
    **/
    _count?: true | EvenementStressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EvenementStressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EvenementStressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EvenementStressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EvenementStressMaxAggregateInputType
  }

  export type GetEvenementStressAggregateType<T extends EvenementStressAggregateArgs> = {
        [P in keyof T & keyof AggregateEvenementStress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvenementStress[P]>
      : GetScalarType<T[P], AggregateEvenementStress[P]>
  }




  export type EvenementStressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvenementStressWhereInput
    orderBy?: EvenementStressOrderByWithAggregationInput | EvenementStressOrderByWithAggregationInput[]
    by: EvenementStressScalarFieldEnum[] | EvenementStressScalarFieldEnum
    having?: EvenementStressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EvenementStressCountAggregateInputType | true
    _avg?: EvenementStressAvgAggregateInputType
    _sum?: EvenementStressSumAggregateInputType
    _min?: EvenementStressMinAggregateInputType
    _max?: EvenementStressMaxAggregateInputType
  }

  export type EvenementStressGroupByOutputType = {
    id: string
    description: string
    points: number
    isActif: boolean
    _count: EvenementStressCountAggregateOutputType | null
    _avg: EvenementStressAvgAggregateOutputType | null
    _sum: EvenementStressSumAggregateOutputType | null
    _min: EvenementStressMinAggregateOutputType | null
    _max: EvenementStressMaxAggregateOutputType | null
  }

  type GetEvenementStressGroupByPayload<T extends EvenementStressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EvenementStressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EvenementStressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EvenementStressGroupByOutputType[P]>
            : GetScalarType<T[P], EvenementStressGroupByOutputType[P]>
        }
      >
    >


  export type EvenementStressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    points?: boolean
    isActif?: boolean
    reponses?: boolean | EvenementStress$reponsesArgs<ExtArgs>
    _count?: boolean | EvenementStressCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["evenementStress"]>



  export type EvenementStressSelectScalar = {
    id?: boolean
    description?: boolean
    points?: boolean
    isActif?: boolean
  }

  export type EvenementStressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "description" | "points" | "isActif", ExtArgs["result"]["evenementStress"]>
  export type EvenementStressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reponses?: boolean | EvenementStress$reponsesArgs<ExtArgs>
    _count?: boolean | EvenementStressCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $EvenementStressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EvenementStress"
    objects: {
      reponses: Prisma.$ReponseDiagnosticPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      description: string
      points: number
      isActif: boolean
    }, ExtArgs["result"]["evenementStress"]>
    composites: {}
  }

  type EvenementStressGetPayload<S extends boolean | null | undefined | EvenementStressDefaultArgs> = $Result.GetResult<Prisma.$EvenementStressPayload, S>

  type EvenementStressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EvenementStressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EvenementStressCountAggregateInputType | true
    }

  export interface EvenementStressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EvenementStress'], meta: { name: 'EvenementStress' } }
    /**
     * Find zero or one EvenementStress that matches the filter.
     * @param {EvenementStressFindUniqueArgs} args - Arguments to find a EvenementStress
     * @example
     * // Get one EvenementStress
     * const evenementStress = await prisma.evenementStress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EvenementStressFindUniqueArgs>(args: SelectSubset<T, EvenementStressFindUniqueArgs<ExtArgs>>): Prisma__EvenementStressClient<$Result.GetResult<Prisma.$EvenementStressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EvenementStress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EvenementStressFindUniqueOrThrowArgs} args - Arguments to find a EvenementStress
     * @example
     * // Get one EvenementStress
     * const evenementStress = await prisma.evenementStress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EvenementStressFindUniqueOrThrowArgs>(args: SelectSubset<T, EvenementStressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EvenementStressClient<$Result.GetResult<Prisma.$EvenementStressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EvenementStress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvenementStressFindFirstArgs} args - Arguments to find a EvenementStress
     * @example
     * // Get one EvenementStress
     * const evenementStress = await prisma.evenementStress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EvenementStressFindFirstArgs>(args?: SelectSubset<T, EvenementStressFindFirstArgs<ExtArgs>>): Prisma__EvenementStressClient<$Result.GetResult<Prisma.$EvenementStressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EvenementStress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvenementStressFindFirstOrThrowArgs} args - Arguments to find a EvenementStress
     * @example
     * // Get one EvenementStress
     * const evenementStress = await prisma.evenementStress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EvenementStressFindFirstOrThrowArgs>(args?: SelectSubset<T, EvenementStressFindFirstOrThrowArgs<ExtArgs>>): Prisma__EvenementStressClient<$Result.GetResult<Prisma.$EvenementStressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EvenementStresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvenementStressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EvenementStresses
     * const evenementStresses = await prisma.evenementStress.findMany()
     * 
     * // Get first 10 EvenementStresses
     * const evenementStresses = await prisma.evenementStress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const evenementStressWithIdOnly = await prisma.evenementStress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EvenementStressFindManyArgs>(args?: SelectSubset<T, EvenementStressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvenementStressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EvenementStress.
     * @param {EvenementStressCreateArgs} args - Arguments to create a EvenementStress.
     * @example
     * // Create one EvenementStress
     * const EvenementStress = await prisma.evenementStress.create({
     *   data: {
     *     // ... data to create a EvenementStress
     *   }
     * })
     * 
     */
    create<T extends EvenementStressCreateArgs>(args: SelectSubset<T, EvenementStressCreateArgs<ExtArgs>>): Prisma__EvenementStressClient<$Result.GetResult<Prisma.$EvenementStressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EvenementStresses.
     * @param {EvenementStressCreateManyArgs} args - Arguments to create many EvenementStresses.
     * @example
     * // Create many EvenementStresses
     * const evenementStress = await prisma.evenementStress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EvenementStressCreateManyArgs>(args?: SelectSubset<T, EvenementStressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a EvenementStress.
     * @param {EvenementStressDeleteArgs} args - Arguments to delete one EvenementStress.
     * @example
     * // Delete one EvenementStress
     * const EvenementStress = await prisma.evenementStress.delete({
     *   where: {
     *     // ... filter to delete one EvenementStress
     *   }
     * })
     * 
     */
    delete<T extends EvenementStressDeleteArgs>(args: SelectSubset<T, EvenementStressDeleteArgs<ExtArgs>>): Prisma__EvenementStressClient<$Result.GetResult<Prisma.$EvenementStressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EvenementStress.
     * @param {EvenementStressUpdateArgs} args - Arguments to update one EvenementStress.
     * @example
     * // Update one EvenementStress
     * const evenementStress = await prisma.evenementStress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EvenementStressUpdateArgs>(args: SelectSubset<T, EvenementStressUpdateArgs<ExtArgs>>): Prisma__EvenementStressClient<$Result.GetResult<Prisma.$EvenementStressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EvenementStresses.
     * @param {EvenementStressDeleteManyArgs} args - Arguments to filter EvenementStresses to delete.
     * @example
     * // Delete a few EvenementStresses
     * const { count } = await prisma.evenementStress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EvenementStressDeleteManyArgs>(args?: SelectSubset<T, EvenementStressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EvenementStresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvenementStressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EvenementStresses
     * const evenementStress = await prisma.evenementStress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EvenementStressUpdateManyArgs>(args: SelectSubset<T, EvenementStressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EvenementStress.
     * @param {EvenementStressUpsertArgs} args - Arguments to update or create a EvenementStress.
     * @example
     * // Update or create a EvenementStress
     * const evenementStress = await prisma.evenementStress.upsert({
     *   create: {
     *     // ... data to create a EvenementStress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EvenementStress we want to update
     *   }
     * })
     */
    upsert<T extends EvenementStressUpsertArgs>(args: SelectSubset<T, EvenementStressUpsertArgs<ExtArgs>>): Prisma__EvenementStressClient<$Result.GetResult<Prisma.$EvenementStressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EvenementStresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvenementStressCountArgs} args - Arguments to filter EvenementStresses to count.
     * @example
     * // Count the number of EvenementStresses
     * const count = await prisma.evenementStress.count({
     *   where: {
     *     // ... the filter for the EvenementStresses we want to count
     *   }
     * })
    **/
    count<T extends EvenementStressCountArgs>(
      args?: Subset<T, EvenementStressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EvenementStressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EvenementStress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvenementStressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EvenementStressAggregateArgs>(args: Subset<T, EvenementStressAggregateArgs>): Prisma.PrismaPromise<GetEvenementStressAggregateType<T>>

    /**
     * Group by EvenementStress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvenementStressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EvenementStressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EvenementStressGroupByArgs['orderBy'] }
        : { orderBy?: EvenementStressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EvenementStressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEvenementStressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EvenementStress model
   */
  readonly fields: EvenementStressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EvenementStress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EvenementStressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reponses<T extends EvenementStress$reponsesArgs<ExtArgs> = {}>(args?: Subset<T, EvenementStress$reponsesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReponseDiagnosticPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EvenementStress model
   */
  interface EvenementStressFieldRefs {
    readonly id: FieldRef<"EvenementStress", 'String'>
    readonly description: FieldRef<"EvenementStress", 'String'>
    readonly points: FieldRef<"EvenementStress", 'Int'>
    readonly isActif: FieldRef<"EvenementStress", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * EvenementStress findUnique
   */
  export type EvenementStressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvenementStress
     */
    select?: EvenementStressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvenementStress
     */
    omit?: EvenementStressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvenementStressInclude<ExtArgs> | null
    /**
     * Filter, which EvenementStress to fetch.
     */
    where: EvenementStressWhereUniqueInput
  }

  /**
   * EvenementStress findUniqueOrThrow
   */
  export type EvenementStressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvenementStress
     */
    select?: EvenementStressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvenementStress
     */
    omit?: EvenementStressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvenementStressInclude<ExtArgs> | null
    /**
     * Filter, which EvenementStress to fetch.
     */
    where: EvenementStressWhereUniqueInput
  }

  /**
   * EvenementStress findFirst
   */
  export type EvenementStressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvenementStress
     */
    select?: EvenementStressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvenementStress
     */
    omit?: EvenementStressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvenementStressInclude<ExtArgs> | null
    /**
     * Filter, which EvenementStress to fetch.
     */
    where?: EvenementStressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvenementStresses to fetch.
     */
    orderBy?: EvenementStressOrderByWithRelationInput | EvenementStressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EvenementStresses.
     */
    cursor?: EvenementStressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvenementStresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvenementStresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EvenementStresses.
     */
    distinct?: EvenementStressScalarFieldEnum | EvenementStressScalarFieldEnum[]
  }

  /**
   * EvenementStress findFirstOrThrow
   */
  export type EvenementStressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvenementStress
     */
    select?: EvenementStressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvenementStress
     */
    omit?: EvenementStressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvenementStressInclude<ExtArgs> | null
    /**
     * Filter, which EvenementStress to fetch.
     */
    where?: EvenementStressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvenementStresses to fetch.
     */
    orderBy?: EvenementStressOrderByWithRelationInput | EvenementStressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EvenementStresses.
     */
    cursor?: EvenementStressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvenementStresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvenementStresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EvenementStresses.
     */
    distinct?: EvenementStressScalarFieldEnum | EvenementStressScalarFieldEnum[]
  }

  /**
   * EvenementStress findMany
   */
  export type EvenementStressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvenementStress
     */
    select?: EvenementStressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvenementStress
     */
    omit?: EvenementStressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvenementStressInclude<ExtArgs> | null
    /**
     * Filter, which EvenementStresses to fetch.
     */
    where?: EvenementStressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvenementStresses to fetch.
     */
    orderBy?: EvenementStressOrderByWithRelationInput | EvenementStressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EvenementStresses.
     */
    cursor?: EvenementStressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvenementStresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvenementStresses.
     */
    skip?: number
    distinct?: EvenementStressScalarFieldEnum | EvenementStressScalarFieldEnum[]
  }

  /**
   * EvenementStress create
   */
  export type EvenementStressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvenementStress
     */
    select?: EvenementStressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvenementStress
     */
    omit?: EvenementStressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvenementStressInclude<ExtArgs> | null
    /**
     * The data needed to create a EvenementStress.
     */
    data: XOR<EvenementStressCreateInput, EvenementStressUncheckedCreateInput>
  }

  /**
   * EvenementStress createMany
   */
  export type EvenementStressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EvenementStresses.
     */
    data: EvenementStressCreateManyInput | EvenementStressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EvenementStress update
   */
  export type EvenementStressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvenementStress
     */
    select?: EvenementStressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvenementStress
     */
    omit?: EvenementStressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvenementStressInclude<ExtArgs> | null
    /**
     * The data needed to update a EvenementStress.
     */
    data: XOR<EvenementStressUpdateInput, EvenementStressUncheckedUpdateInput>
    /**
     * Choose, which EvenementStress to update.
     */
    where: EvenementStressWhereUniqueInput
  }

  /**
   * EvenementStress updateMany
   */
  export type EvenementStressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EvenementStresses.
     */
    data: XOR<EvenementStressUpdateManyMutationInput, EvenementStressUncheckedUpdateManyInput>
    /**
     * Filter which EvenementStresses to update
     */
    where?: EvenementStressWhereInput
    /**
     * Limit how many EvenementStresses to update.
     */
    limit?: number
  }

  /**
   * EvenementStress upsert
   */
  export type EvenementStressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvenementStress
     */
    select?: EvenementStressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvenementStress
     */
    omit?: EvenementStressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvenementStressInclude<ExtArgs> | null
    /**
     * The filter to search for the EvenementStress to update in case it exists.
     */
    where: EvenementStressWhereUniqueInput
    /**
     * In case the EvenementStress found by the `where` argument doesn't exist, create a new EvenementStress with this data.
     */
    create: XOR<EvenementStressCreateInput, EvenementStressUncheckedCreateInput>
    /**
     * In case the EvenementStress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EvenementStressUpdateInput, EvenementStressUncheckedUpdateInput>
  }

  /**
   * EvenementStress delete
   */
  export type EvenementStressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvenementStress
     */
    select?: EvenementStressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvenementStress
     */
    omit?: EvenementStressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvenementStressInclude<ExtArgs> | null
    /**
     * Filter which EvenementStress to delete.
     */
    where: EvenementStressWhereUniqueInput
  }

  /**
   * EvenementStress deleteMany
   */
  export type EvenementStressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EvenementStresses to delete
     */
    where?: EvenementStressWhereInput
    /**
     * Limit how many EvenementStresses to delete.
     */
    limit?: number
  }

  /**
   * EvenementStress.reponses
   */
  export type EvenementStress$reponsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReponseDiagnostic
     */
    select?: ReponseDiagnosticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReponseDiagnostic
     */
    omit?: ReponseDiagnosticOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReponseDiagnosticInclude<ExtArgs> | null
    where?: ReponseDiagnosticWhereInput
    orderBy?: ReponseDiagnosticOrderByWithRelationInput | ReponseDiagnosticOrderByWithRelationInput[]
    cursor?: ReponseDiagnosticWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReponseDiagnosticScalarFieldEnum | ReponseDiagnosticScalarFieldEnum[]
  }

  /**
   * EvenementStress without action
   */
  export type EvenementStressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvenementStress
     */
    select?: EvenementStressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvenementStress
     */
    omit?: EvenementStressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvenementStressInclude<ExtArgs> | null
  }


  /**
   * Model ResultatDiagnostic
   */

  export type AggregateResultatDiagnostic = {
    _count: ResultatDiagnosticCountAggregateOutputType | null
    _avg: ResultatDiagnosticAvgAggregateOutputType | null
    _sum: ResultatDiagnosticSumAggregateOutputType | null
    _min: ResultatDiagnosticMinAggregateOutputType | null
    _max: ResultatDiagnosticMaxAggregateOutputType | null
  }

  export type ResultatDiagnosticAvgAggregateOutputType = {
    scoreTotal: number | null
  }

  export type ResultatDiagnosticSumAggregateOutputType = {
    scoreTotal: number | null
  }

  export type ResultatDiagnosticMinAggregateOutputType = {
    id: string | null
    dateEvaluation: Date | null
    scoreTotal: number | null
    niveauStress: string | null
    utilisateurId: string | null
  }

  export type ResultatDiagnosticMaxAggregateOutputType = {
    id: string | null
    dateEvaluation: Date | null
    scoreTotal: number | null
    niveauStress: string | null
    utilisateurId: string | null
  }

  export type ResultatDiagnosticCountAggregateOutputType = {
    id: number
    dateEvaluation: number
    scoreTotal: number
    niveauStress: number
    utilisateurId: number
    _all: number
  }


  export type ResultatDiagnosticAvgAggregateInputType = {
    scoreTotal?: true
  }

  export type ResultatDiagnosticSumAggregateInputType = {
    scoreTotal?: true
  }

  export type ResultatDiagnosticMinAggregateInputType = {
    id?: true
    dateEvaluation?: true
    scoreTotal?: true
    niveauStress?: true
    utilisateurId?: true
  }

  export type ResultatDiagnosticMaxAggregateInputType = {
    id?: true
    dateEvaluation?: true
    scoreTotal?: true
    niveauStress?: true
    utilisateurId?: true
  }

  export type ResultatDiagnosticCountAggregateInputType = {
    id?: true
    dateEvaluation?: true
    scoreTotal?: true
    niveauStress?: true
    utilisateurId?: true
    _all?: true
  }

  export type ResultatDiagnosticAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResultatDiagnostic to aggregate.
     */
    where?: ResultatDiagnosticWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResultatDiagnostics to fetch.
     */
    orderBy?: ResultatDiagnosticOrderByWithRelationInput | ResultatDiagnosticOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResultatDiagnosticWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResultatDiagnostics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResultatDiagnostics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ResultatDiagnostics
    **/
    _count?: true | ResultatDiagnosticCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResultatDiagnosticAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResultatDiagnosticSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResultatDiagnosticMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResultatDiagnosticMaxAggregateInputType
  }

  export type GetResultatDiagnosticAggregateType<T extends ResultatDiagnosticAggregateArgs> = {
        [P in keyof T & keyof AggregateResultatDiagnostic]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResultatDiagnostic[P]>
      : GetScalarType<T[P], AggregateResultatDiagnostic[P]>
  }




  export type ResultatDiagnosticGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResultatDiagnosticWhereInput
    orderBy?: ResultatDiagnosticOrderByWithAggregationInput | ResultatDiagnosticOrderByWithAggregationInput[]
    by: ResultatDiagnosticScalarFieldEnum[] | ResultatDiagnosticScalarFieldEnum
    having?: ResultatDiagnosticScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResultatDiagnosticCountAggregateInputType | true
    _avg?: ResultatDiagnosticAvgAggregateInputType
    _sum?: ResultatDiagnosticSumAggregateInputType
    _min?: ResultatDiagnosticMinAggregateInputType
    _max?: ResultatDiagnosticMaxAggregateInputType
  }

  export type ResultatDiagnosticGroupByOutputType = {
    id: string
    dateEvaluation: Date
    scoreTotal: number
    niveauStress: string
    utilisateurId: string
    _count: ResultatDiagnosticCountAggregateOutputType | null
    _avg: ResultatDiagnosticAvgAggregateOutputType | null
    _sum: ResultatDiagnosticSumAggregateOutputType | null
    _min: ResultatDiagnosticMinAggregateOutputType | null
    _max: ResultatDiagnosticMaxAggregateOutputType | null
  }

  type GetResultatDiagnosticGroupByPayload<T extends ResultatDiagnosticGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResultatDiagnosticGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResultatDiagnosticGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResultatDiagnosticGroupByOutputType[P]>
            : GetScalarType<T[P], ResultatDiagnosticGroupByOutputType[P]>
        }
      >
    >


  export type ResultatDiagnosticSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dateEvaluation?: boolean
    scoreTotal?: boolean
    niveauStress?: boolean
    utilisateurId?: boolean
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
    reponses?: boolean | ResultatDiagnostic$reponsesArgs<ExtArgs>
    _count?: boolean | ResultatDiagnosticCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resultatDiagnostic"]>



  export type ResultatDiagnosticSelectScalar = {
    id?: boolean
    dateEvaluation?: boolean
    scoreTotal?: boolean
    niveauStress?: boolean
    utilisateurId?: boolean
  }

  export type ResultatDiagnosticOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dateEvaluation" | "scoreTotal" | "niveauStress" | "utilisateurId", ExtArgs["result"]["resultatDiagnostic"]>
  export type ResultatDiagnosticInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
    reponses?: boolean | ResultatDiagnostic$reponsesArgs<ExtArgs>
    _count?: boolean | ResultatDiagnosticCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ResultatDiagnosticPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ResultatDiagnostic"
    objects: {
      utilisateur: Prisma.$UserPayload<ExtArgs>
      reponses: Prisma.$ReponseDiagnosticPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      dateEvaluation: Date
      scoreTotal: number
      niveauStress: string
      utilisateurId: string
    }, ExtArgs["result"]["resultatDiagnostic"]>
    composites: {}
  }

  type ResultatDiagnosticGetPayload<S extends boolean | null | undefined | ResultatDiagnosticDefaultArgs> = $Result.GetResult<Prisma.$ResultatDiagnosticPayload, S>

  type ResultatDiagnosticCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResultatDiagnosticFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResultatDiagnosticCountAggregateInputType | true
    }

  export interface ResultatDiagnosticDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ResultatDiagnostic'], meta: { name: 'ResultatDiagnostic' } }
    /**
     * Find zero or one ResultatDiagnostic that matches the filter.
     * @param {ResultatDiagnosticFindUniqueArgs} args - Arguments to find a ResultatDiagnostic
     * @example
     * // Get one ResultatDiagnostic
     * const resultatDiagnostic = await prisma.resultatDiagnostic.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResultatDiagnosticFindUniqueArgs>(args: SelectSubset<T, ResultatDiagnosticFindUniqueArgs<ExtArgs>>): Prisma__ResultatDiagnosticClient<$Result.GetResult<Prisma.$ResultatDiagnosticPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ResultatDiagnostic that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResultatDiagnosticFindUniqueOrThrowArgs} args - Arguments to find a ResultatDiagnostic
     * @example
     * // Get one ResultatDiagnostic
     * const resultatDiagnostic = await prisma.resultatDiagnostic.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResultatDiagnosticFindUniqueOrThrowArgs>(args: SelectSubset<T, ResultatDiagnosticFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResultatDiagnosticClient<$Result.GetResult<Prisma.$ResultatDiagnosticPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResultatDiagnostic that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultatDiagnosticFindFirstArgs} args - Arguments to find a ResultatDiagnostic
     * @example
     * // Get one ResultatDiagnostic
     * const resultatDiagnostic = await prisma.resultatDiagnostic.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResultatDiagnosticFindFirstArgs>(args?: SelectSubset<T, ResultatDiagnosticFindFirstArgs<ExtArgs>>): Prisma__ResultatDiagnosticClient<$Result.GetResult<Prisma.$ResultatDiagnosticPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResultatDiagnostic that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultatDiagnosticFindFirstOrThrowArgs} args - Arguments to find a ResultatDiagnostic
     * @example
     * // Get one ResultatDiagnostic
     * const resultatDiagnostic = await prisma.resultatDiagnostic.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResultatDiagnosticFindFirstOrThrowArgs>(args?: SelectSubset<T, ResultatDiagnosticFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResultatDiagnosticClient<$Result.GetResult<Prisma.$ResultatDiagnosticPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ResultatDiagnostics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultatDiagnosticFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ResultatDiagnostics
     * const resultatDiagnostics = await prisma.resultatDiagnostic.findMany()
     * 
     * // Get first 10 ResultatDiagnostics
     * const resultatDiagnostics = await prisma.resultatDiagnostic.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resultatDiagnosticWithIdOnly = await prisma.resultatDiagnostic.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResultatDiagnosticFindManyArgs>(args?: SelectSubset<T, ResultatDiagnosticFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResultatDiagnosticPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ResultatDiagnostic.
     * @param {ResultatDiagnosticCreateArgs} args - Arguments to create a ResultatDiagnostic.
     * @example
     * // Create one ResultatDiagnostic
     * const ResultatDiagnostic = await prisma.resultatDiagnostic.create({
     *   data: {
     *     // ... data to create a ResultatDiagnostic
     *   }
     * })
     * 
     */
    create<T extends ResultatDiagnosticCreateArgs>(args: SelectSubset<T, ResultatDiagnosticCreateArgs<ExtArgs>>): Prisma__ResultatDiagnosticClient<$Result.GetResult<Prisma.$ResultatDiagnosticPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ResultatDiagnostics.
     * @param {ResultatDiagnosticCreateManyArgs} args - Arguments to create many ResultatDiagnostics.
     * @example
     * // Create many ResultatDiagnostics
     * const resultatDiagnostic = await prisma.resultatDiagnostic.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResultatDiagnosticCreateManyArgs>(args?: SelectSubset<T, ResultatDiagnosticCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ResultatDiagnostic.
     * @param {ResultatDiagnosticDeleteArgs} args - Arguments to delete one ResultatDiagnostic.
     * @example
     * // Delete one ResultatDiagnostic
     * const ResultatDiagnostic = await prisma.resultatDiagnostic.delete({
     *   where: {
     *     // ... filter to delete one ResultatDiagnostic
     *   }
     * })
     * 
     */
    delete<T extends ResultatDiagnosticDeleteArgs>(args: SelectSubset<T, ResultatDiagnosticDeleteArgs<ExtArgs>>): Prisma__ResultatDiagnosticClient<$Result.GetResult<Prisma.$ResultatDiagnosticPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ResultatDiagnostic.
     * @param {ResultatDiagnosticUpdateArgs} args - Arguments to update one ResultatDiagnostic.
     * @example
     * // Update one ResultatDiagnostic
     * const resultatDiagnostic = await prisma.resultatDiagnostic.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResultatDiagnosticUpdateArgs>(args: SelectSubset<T, ResultatDiagnosticUpdateArgs<ExtArgs>>): Prisma__ResultatDiagnosticClient<$Result.GetResult<Prisma.$ResultatDiagnosticPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ResultatDiagnostics.
     * @param {ResultatDiagnosticDeleteManyArgs} args - Arguments to filter ResultatDiagnostics to delete.
     * @example
     * // Delete a few ResultatDiagnostics
     * const { count } = await prisma.resultatDiagnostic.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResultatDiagnosticDeleteManyArgs>(args?: SelectSubset<T, ResultatDiagnosticDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResultatDiagnostics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultatDiagnosticUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ResultatDiagnostics
     * const resultatDiagnostic = await prisma.resultatDiagnostic.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResultatDiagnosticUpdateManyArgs>(args: SelectSubset<T, ResultatDiagnosticUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ResultatDiagnostic.
     * @param {ResultatDiagnosticUpsertArgs} args - Arguments to update or create a ResultatDiagnostic.
     * @example
     * // Update or create a ResultatDiagnostic
     * const resultatDiagnostic = await prisma.resultatDiagnostic.upsert({
     *   create: {
     *     // ... data to create a ResultatDiagnostic
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ResultatDiagnostic we want to update
     *   }
     * })
     */
    upsert<T extends ResultatDiagnosticUpsertArgs>(args: SelectSubset<T, ResultatDiagnosticUpsertArgs<ExtArgs>>): Prisma__ResultatDiagnosticClient<$Result.GetResult<Prisma.$ResultatDiagnosticPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ResultatDiagnostics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultatDiagnosticCountArgs} args - Arguments to filter ResultatDiagnostics to count.
     * @example
     * // Count the number of ResultatDiagnostics
     * const count = await prisma.resultatDiagnostic.count({
     *   where: {
     *     // ... the filter for the ResultatDiagnostics we want to count
     *   }
     * })
    **/
    count<T extends ResultatDiagnosticCountArgs>(
      args?: Subset<T, ResultatDiagnosticCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResultatDiagnosticCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ResultatDiagnostic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultatDiagnosticAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResultatDiagnosticAggregateArgs>(args: Subset<T, ResultatDiagnosticAggregateArgs>): Prisma.PrismaPromise<GetResultatDiagnosticAggregateType<T>>

    /**
     * Group by ResultatDiagnostic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultatDiagnosticGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResultatDiagnosticGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResultatDiagnosticGroupByArgs['orderBy'] }
        : { orderBy?: ResultatDiagnosticGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResultatDiagnosticGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResultatDiagnosticGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ResultatDiagnostic model
   */
  readonly fields: ResultatDiagnosticFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ResultatDiagnostic.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResultatDiagnosticClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    utilisateur<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    reponses<T extends ResultatDiagnostic$reponsesArgs<ExtArgs> = {}>(args?: Subset<T, ResultatDiagnostic$reponsesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReponseDiagnosticPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ResultatDiagnostic model
   */
  interface ResultatDiagnosticFieldRefs {
    readonly id: FieldRef<"ResultatDiagnostic", 'String'>
    readonly dateEvaluation: FieldRef<"ResultatDiagnostic", 'DateTime'>
    readonly scoreTotal: FieldRef<"ResultatDiagnostic", 'Int'>
    readonly niveauStress: FieldRef<"ResultatDiagnostic", 'String'>
    readonly utilisateurId: FieldRef<"ResultatDiagnostic", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ResultatDiagnostic findUnique
   */
  export type ResultatDiagnosticFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResultatDiagnostic
     */
    select?: ResultatDiagnosticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResultatDiagnostic
     */
    omit?: ResultatDiagnosticOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultatDiagnosticInclude<ExtArgs> | null
    /**
     * Filter, which ResultatDiagnostic to fetch.
     */
    where: ResultatDiagnosticWhereUniqueInput
  }

  /**
   * ResultatDiagnostic findUniqueOrThrow
   */
  export type ResultatDiagnosticFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResultatDiagnostic
     */
    select?: ResultatDiagnosticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResultatDiagnostic
     */
    omit?: ResultatDiagnosticOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultatDiagnosticInclude<ExtArgs> | null
    /**
     * Filter, which ResultatDiagnostic to fetch.
     */
    where: ResultatDiagnosticWhereUniqueInput
  }

  /**
   * ResultatDiagnostic findFirst
   */
  export type ResultatDiagnosticFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResultatDiagnostic
     */
    select?: ResultatDiagnosticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResultatDiagnostic
     */
    omit?: ResultatDiagnosticOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultatDiagnosticInclude<ExtArgs> | null
    /**
     * Filter, which ResultatDiagnostic to fetch.
     */
    where?: ResultatDiagnosticWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResultatDiagnostics to fetch.
     */
    orderBy?: ResultatDiagnosticOrderByWithRelationInput | ResultatDiagnosticOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResultatDiagnostics.
     */
    cursor?: ResultatDiagnosticWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResultatDiagnostics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResultatDiagnostics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResultatDiagnostics.
     */
    distinct?: ResultatDiagnosticScalarFieldEnum | ResultatDiagnosticScalarFieldEnum[]
  }

  /**
   * ResultatDiagnostic findFirstOrThrow
   */
  export type ResultatDiagnosticFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResultatDiagnostic
     */
    select?: ResultatDiagnosticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResultatDiagnostic
     */
    omit?: ResultatDiagnosticOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultatDiagnosticInclude<ExtArgs> | null
    /**
     * Filter, which ResultatDiagnostic to fetch.
     */
    where?: ResultatDiagnosticWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResultatDiagnostics to fetch.
     */
    orderBy?: ResultatDiagnosticOrderByWithRelationInput | ResultatDiagnosticOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResultatDiagnostics.
     */
    cursor?: ResultatDiagnosticWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResultatDiagnostics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResultatDiagnostics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResultatDiagnostics.
     */
    distinct?: ResultatDiagnosticScalarFieldEnum | ResultatDiagnosticScalarFieldEnum[]
  }

  /**
   * ResultatDiagnostic findMany
   */
  export type ResultatDiagnosticFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResultatDiagnostic
     */
    select?: ResultatDiagnosticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResultatDiagnostic
     */
    omit?: ResultatDiagnosticOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultatDiagnosticInclude<ExtArgs> | null
    /**
     * Filter, which ResultatDiagnostics to fetch.
     */
    where?: ResultatDiagnosticWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResultatDiagnostics to fetch.
     */
    orderBy?: ResultatDiagnosticOrderByWithRelationInput | ResultatDiagnosticOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ResultatDiagnostics.
     */
    cursor?: ResultatDiagnosticWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResultatDiagnostics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResultatDiagnostics.
     */
    skip?: number
    distinct?: ResultatDiagnosticScalarFieldEnum | ResultatDiagnosticScalarFieldEnum[]
  }

  /**
   * ResultatDiagnostic create
   */
  export type ResultatDiagnosticCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResultatDiagnostic
     */
    select?: ResultatDiagnosticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResultatDiagnostic
     */
    omit?: ResultatDiagnosticOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultatDiagnosticInclude<ExtArgs> | null
    /**
     * The data needed to create a ResultatDiagnostic.
     */
    data: XOR<ResultatDiagnosticCreateInput, ResultatDiagnosticUncheckedCreateInput>
  }

  /**
   * ResultatDiagnostic createMany
   */
  export type ResultatDiagnosticCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ResultatDiagnostics.
     */
    data: ResultatDiagnosticCreateManyInput | ResultatDiagnosticCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ResultatDiagnostic update
   */
  export type ResultatDiagnosticUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResultatDiagnostic
     */
    select?: ResultatDiagnosticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResultatDiagnostic
     */
    omit?: ResultatDiagnosticOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultatDiagnosticInclude<ExtArgs> | null
    /**
     * The data needed to update a ResultatDiagnostic.
     */
    data: XOR<ResultatDiagnosticUpdateInput, ResultatDiagnosticUncheckedUpdateInput>
    /**
     * Choose, which ResultatDiagnostic to update.
     */
    where: ResultatDiagnosticWhereUniqueInput
  }

  /**
   * ResultatDiagnostic updateMany
   */
  export type ResultatDiagnosticUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ResultatDiagnostics.
     */
    data: XOR<ResultatDiagnosticUpdateManyMutationInput, ResultatDiagnosticUncheckedUpdateManyInput>
    /**
     * Filter which ResultatDiagnostics to update
     */
    where?: ResultatDiagnosticWhereInput
    /**
     * Limit how many ResultatDiagnostics to update.
     */
    limit?: number
  }

  /**
   * ResultatDiagnostic upsert
   */
  export type ResultatDiagnosticUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResultatDiagnostic
     */
    select?: ResultatDiagnosticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResultatDiagnostic
     */
    omit?: ResultatDiagnosticOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultatDiagnosticInclude<ExtArgs> | null
    /**
     * The filter to search for the ResultatDiagnostic to update in case it exists.
     */
    where: ResultatDiagnosticWhereUniqueInput
    /**
     * In case the ResultatDiagnostic found by the `where` argument doesn't exist, create a new ResultatDiagnostic with this data.
     */
    create: XOR<ResultatDiagnosticCreateInput, ResultatDiagnosticUncheckedCreateInput>
    /**
     * In case the ResultatDiagnostic was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResultatDiagnosticUpdateInput, ResultatDiagnosticUncheckedUpdateInput>
  }

  /**
   * ResultatDiagnostic delete
   */
  export type ResultatDiagnosticDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResultatDiagnostic
     */
    select?: ResultatDiagnosticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResultatDiagnostic
     */
    omit?: ResultatDiagnosticOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultatDiagnosticInclude<ExtArgs> | null
    /**
     * Filter which ResultatDiagnostic to delete.
     */
    where: ResultatDiagnosticWhereUniqueInput
  }

  /**
   * ResultatDiagnostic deleteMany
   */
  export type ResultatDiagnosticDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResultatDiagnostics to delete
     */
    where?: ResultatDiagnosticWhereInput
    /**
     * Limit how many ResultatDiagnostics to delete.
     */
    limit?: number
  }

  /**
   * ResultatDiagnostic.reponses
   */
  export type ResultatDiagnostic$reponsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReponseDiagnostic
     */
    select?: ReponseDiagnosticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReponseDiagnostic
     */
    omit?: ReponseDiagnosticOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReponseDiagnosticInclude<ExtArgs> | null
    where?: ReponseDiagnosticWhereInput
    orderBy?: ReponseDiagnosticOrderByWithRelationInput | ReponseDiagnosticOrderByWithRelationInput[]
    cursor?: ReponseDiagnosticWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReponseDiagnosticScalarFieldEnum | ReponseDiagnosticScalarFieldEnum[]
  }

  /**
   * ResultatDiagnostic without action
   */
  export type ResultatDiagnosticDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResultatDiagnostic
     */
    select?: ResultatDiagnosticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResultatDiagnostic
     */
    omit?: ResultatDiagnosticOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultatDiagnosticInclude<ExtArgs> | null
  }


  /**
   * Model ReponseDiagnostic
   */

  export type AggregateReponseDiagnostic = {
    _count: ReponseDiagnosticCountAggregateOutputType | null
    _min: ReponseDiagnosticMinAggregateOutputType | null
    _max: ReponseDiagnosticMaxAggregateOutputType | null
  }

  export type ReponseDiagnosticMinAggregateOutputType = {
    resultatId: string | null
    evenementId: string | null
  }

  export type ReponseDiagnosticMaxAggregateOutputType = {
    resultatId: string | null
    evenementId: string | null
  }

  export type ReponseDiagnosticCountAggregateOutputType = {
    resultatId: number
    evenementId: number
    _all: number
  }


  export type ReponseDiagnosticMinAggregateInputType = {
    resultatId?: true
    evenementId?: true
  }

  export type ReponseDiagnosticMaxAggregateInputType = {
    resultatId?: true
    evenementId?: true
  }

  export type ReponseDiagnosticCountAggregateInputType = {
    resultatId?: true
    evenementId?: true
    _all?: true
  }

  export type ReponseDiagnosticAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReponseDiagnostic to aggregate.
     */
    where?: ReponseDiagnosticWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReponseDiagnostics to fetch.
     */
    orderBy?: ReponseDiagnosticOrderByWithRelationInput | ReponseDiagnosticOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReponseDiagnosticWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReponseDiagnostics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReponseDiagnostics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReponseDiagnostics
    **/
    _count?: true | ReponseDiagnosticCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReponseDiagnosticMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReponseDiagnosticMaxAggregateInputType
  }

  export type GetReponseDiagnosticAggregateType<T extends ReponseDiagnosticAggregateArgs> = {
        [P in keyof T & keyof AggregateReponseDiagnostic]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReponseDiagnostic[P]>
      : GetScalarType<T[P], AggregateReponseDiagnostic[P]>
  }




  export type ReponseDiagnosticGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReponseDiagnosticWhereInput
    orderBy?: ReponseDiagnosticOrderByWithAggregationInput | ReponseDiagnosticOrderByWithAggregationInput[]
    by: ReponseDiagnosticScalarFieldEnum[] | ReponseDiagnosticScalarFieldEnum
    having?: ReponseDiagnosticScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReponseDiagnosticCountAggregateInputType | true
    _min?: ReponseDiagnosticMinAggregateInputType
    _max?: ReponseDiagnosticMaxAggregateInputType
  }

  export type ReponseDiagnosticGroupByOutputType = {
    resultatId: string
    evenementId: string
    _count: ReponseDiagnosticCountAggregateOutputType | null
    _min: ReponseDiagnosticMinAggregateOutputType | null
    _max: ReponseDiagnosticMaxAggregateOutputType | null
  }

  type GetReponseDiagnosticGroupByPayload<T extends ReponseDiagnosticGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReponseDiagnosticGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReponseDiagnosticGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReponseDiagnosticGroupByOutputType[P]>
            : GetScalarType<T[P], ReponseDiagnosticGroupByOutputType[P]>
        }
      >
    >


  export type ReponseDiagnosticSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    resultatId?: boolean
    evenementId?: boolean
    resultat?: boolean | ResultatDiagnosticDefaultArgs<ExtArgs>
    evenement?: boolean | EvenementStressDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reponseDiagnostic"]>



  export type ReponseDiagnosticSelectScalar = {
    resultatId?: boolean
    evenementId?: boolean
  }

  export type ReponseDiagnosticOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"resultatId" | "evenementId", ExtArgs["result"]["reponseDiagnostic"]>
  export type ReponseDiagnosticInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resultat?: boolean | ResultatDiagnosticDefaultArgs<ExtArgs>
    evenement?: boolean | EvenementStressDefaultArgs<ExtArgs>
  }

  export type $ReponseDiagnosticPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReponseDiagnostic"
    objects: {
      resultat: Prisma.$ResultatDiagnosticPayload<ExtArgs>
      evenement: Prisma.$EvenementStressPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      resultatId: string
      evenementId: string
    }, ExtArgs["result"]["reponseDiagnostic"]>
    composites: {}
  }

  type ReponseDiagnosticGetPayload<S extends boolean | null | undefined | ReponseDiagnosticDefaultArgs> = $Result.GetResult<Prisma.$ReponseDiagnosticPayload, S>

  type ReponseDiagnosticCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReponseDiagnosticFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReponseDiagnosticCountAggregateInputType | true
    }

  export interface ReponseDiagnosticDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReponseDiagnostic'], meta: { name: 'ReponseDiagnostic' } }
    /**
     * Find zero or one ReponseDiagnostic that matches the filter.
     * @param {ReponseDiagnosticFindUniqueArgs} args - Arguments to find a ReponseDiagnostic
     * @example
     * // Get one ReponseDiagnostic
     * const reponseDiagnostic = await prisma.reponseDiagnostic.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReponseDiagnosticFindUniqueArgs>(args: SelectSubset<T, ReponseDiagnosticFindUniqueArgs<ExtArgs>>): Prisma__ReponseDiagnosticClient<$Result.GetResult<Prisma.$ReponseDiagnosticPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ReponseDiagnostic that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReponseDiagnosticFindUniqueOrThrowArgs} args - Arguments to find a ReponseDiagnostic
     * @example
     * // Get one ReponseDiagnostic
     * const reponseDiagnostic = await prisma.reponseDiagnostic.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReponseDiagnosticFindUniqueOrThrowArgs>(args: SelectSubset<T, ReponseDiagnosticFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReponseDiagnosticClient<$Result.GetResult<Prisma.$ReponseDiagnosticPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReponseDiagnostic that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReponseDiagnosticFindFirstArgs} args - Arguments to find a ReponseDiagnostic
     * @example
     * // Get one ReponseDiagnostic
     * const reponseDiagnostic = await prisma.reponseDiagnostic.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReponseDiagnosticFindFirstArgs>(args?: SelectSubset<T, ReponseDiagnosticFindFirstArgs<ExtArgs>>): Prisma__ReponseDiagnosticClient<$Result.GetResult<Prisma.$ReponseDiagnosticPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReponseDiagnostic that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReponseDiagnosticFindFirstOrThrowArgs} args - Arguments to find a ReponseDiagnostic
     * @example
     * // Get one ReponseDiagnostic
     * const reponseDiagnostic = await prisma.reponseDiagnostic.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReponseDiagnosticFindFirstOrThrowArgs>(args?: SelectSubset<T, ReponseDiagnosticFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReponseDiagnosticClient<$Result.GetResult<Prisma.$ReponseDiagnosticPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ReponseDiagnostics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReponseDiagnosticFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReponseDiagnostics
     * const reponseDiagnostics = await prisma.reponseDiagnostic.findMany()
     * 
     * // Get first 10 ReponseDiagnostics
     * const reponseDiagnostics = await prisma.reponseDiagnostic.findMany({ take: 10 })
     * 
     * // Only select the `resultatId`
     * const reponseDiagnosticWithResultatIdOnly = await prisma.reponseDiagnostic.findMany({ select: { resultatId: true } })
     * 
     */
    findMany<T extends ReponseDiagnosticFindManyArgs>(args?: SelectSubset<T, ReponseDiagnosticFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReponseDiagnosticPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ReponseDiagnostic.
     * @param {ReponseDiagnosticCreateArgs} args - Arguments to create a ReponseDiagnostic.
     * @example
     * // Create one ReponseDiagnostic
     * const ReponseDiagnostic = await prisma.reponseDiagnostic.create({
     *   data: {
     *     // ... data to create a ReponseDiagnostic
     *   }
     * })
     * 
     */
    create<T extends ReponseDiagnosticCreateArgs>(args: SelectSubset<T, ReponseDiagnosticCreateArgs<ExtArgs>>): Prisma__ReponseDiagnosticClient<$Result.GetResult<Prisma.$ReponseDiagnosticPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ReponseDiagnostics.
     * @param {ReponseDiagnosticCreateManyArgs} args - Arguments to create many ReponseDiagnostics.
     * @example
     * // Create many ReponseDiagnostics
     * const reponseDiagnostic = await prisma.reponseDiagnostic.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReponseDiagnosticCreateManyArgs>(args?: SelectSubset<T, ReponseDiagnosticCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ReponseDiagnostic.
     * @param {ReponseDiagnosticDeleteArgs} args - Arguments to delete one ReponseDiagnostic.
     * @example
     * // Delete one ReponseDiagnostic
     * const ReponseDiagnostic = await prisma.reponseDiagnostic.delete({
     *   where: {
     *     // ... filter to delete one ReponseDiagnostic
     *   }
     * })
     * 
     */
    delete<T extends ReponseDiagnosticDeleteArgs>(args: SelectSubset<T, ReponseDiagnosticDeleteArgs<ExtArgs>>): Prisma__ReponseDiagnosticClient<$Result.GetResult<Prisma.$ReponseDiagnosticPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ReponseDiagnostic.
     * @param {ReponseDiagnosticUpdateArgs} args - Arguments to update one ReponseDiagnostic.
     * @example
     * // Update one ReponseDiagnostic
     * const reponseDiagnostic = await prisma.reponseDiagnostic.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReponseDiagnosticUpdateArgs>(args: SelectSubset<T, ReponseDiagnosticUpdateArgs<ExtArgs>>): Prisma__ReponseDiagnosticClient<$Result.GetResult<Prisma.$ReponseDiagnosticPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ReponseDiagnostics.
     * @param {ReponseDiagnosticDeleteManyArgs} args - Arguments to filter ReponseDiagnostics to delete.
     * @example
     * // Delete a few ReponseDiagnostics
     * const { count } = await prisma.reponseDiagnostic.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReponseDiagnosticDeleteManyArgs>(args?: SelectSubset<T, ReponseDiagnosticDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReponseDiagnostics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReponseDiagnosticUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReponseDiagnostics
     * const reponseDiagnostic = await prisma.reponseDiagnostic.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReponseDiagnosticUpdateManyArgs>(args: SelectSubset<T, ReponseDiagnosticUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ReponseDiagnostic.
     * @param {ReponseDiagnosticUpsertArgs} args - Arguments to update or create a ReponseDiagnostic.
     * @example
     * // Update or create a ReponseDiagnostic
     * const reponseDiagnostic = await prisma.reponseDiagnostic.upsert({
     *   create: {
     *     // ... data to create a ReponseDiagnostic
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReponseDiagnostic we want to update
     *   }
     * })
     */
    upsert<T extends ReponseDiagnosticUpsertArgs>(args: SelectSubset<T, ReponseDiagnosticUpsertArgs<ExtArgs>>): Prisma__ReponseDiagnosticClient<$Result.GetResult<Prisma.$ReponseDiagnosticPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ReponseDiagnostics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReponseDiagnosticCountArgs} args - Arguments to filter ReponseDiagnostics to count.
     * @example
     * // Count the number of ReponseDiagnostics
     * const count = await prisma.reponseDiagnostic.count({
     *   where: {
     *     // ... the filter for the ReponseDiagnostics we want to count
     *   }
     * })
    **/
    count<T extends ReponseDiagnosticCountArgs>(
      args?: Subset<T, ReponseDiagnosticCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReponseDiagnosticCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReponseDiagnostic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReponseDiagnosticAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReponseDiagnosticAggregateArgs>(args: Subset<T, ReponseDiagnosticAggregateArgs>): Prisma.PrismaPromise<GetReponseDiagnosticAggregateType<T>>

    /**
     * Group by ReponseDiagnostic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReponseDiagnosticGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReponseDiagnosticGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReponseDiagnosticGroupByArgs['orderBy'] }
        : { orderBy?: ReponseDiagnosticGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReponseDiagnosticGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReponseDiagnosticGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReponseDiagnostic model
   */
  readonly fields: ReponseDiagnosticFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReponseDiagnostic.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReponseDiagnosticClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    resultat<T extends ResultatDiagnosticDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ResultatDiagnosticDefaultArgs<ExtArgs>>): Prisma__ResultatDiagnosticClient<$Result.GetResult<Prisma.$ResultatDiagnosticPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    evenement<T extends EvenementStressDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EvenementStressDefaultArgs<ExtArgs>>): Prisma__EvenementStressClient<$Result.GetResult<Prisma.$EvenementStressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReponseDiagnostic model
   */
  interface ReponseDiagnosticFieldRefs {
    readonly resultatId: FieldRef<"ReponseDiagnostic", 'String'>
    readonly evenementId: FieldRef<"ReponseDiagnostic", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ReponseDiagnostic findUnique
   */
  export type ReponseDiagnosticFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReponseDiagnostic
     */
    select?: ReponseDiagnosticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReponseDiagnostic
     */
    omit?: ReponseDiagnosticOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReponseDiagnosticInclude<ExtArgs> | null
    /**
     * Filter, which ReponseDiagnostic to fetch.
     */
    where: ReponseDiagnosticWhereUniqueInput
  }

  /**
   * ReponseDiagnostic findUniqueOrThrow
   */
  export type ReponseDiagnosticFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReponseDiagnostic
     */
    select?: ReponseDiagnosticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReponseDiagnostic
     */
    omit?: ReponseDiagnosticOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReponseDiagnosticInclude<ExtArgs> | null
    /**
     * Filter, which ReponseDiagnostic to fetch.
     */
    where: ReponseDiagnosticWhereUniqueInput
  }

  /**
   * ReponseDiagnostic findFirst
   */
  export type ReponseDiagnosticFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReponseDiagnostic
     */
    select?: ReponseDiagnosticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReponseDiagnostic
     */
    omit?: ReponseDiagnosticOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReponseDiagnosticInclude<ExtArgs> | null
    /**
     * Filter, which ReponseDiagnostic to fetch.
     */
    where?: ReponseDiagnosticWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReponseDiagnostics to fetch.
     */
    orderBy?: ReponseDiagnosticOrderByWithRelationInput | ReponseDiagnosticOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReponseDiagnostics.
     */
    cursor?: ReponseDiagnosticWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReponseDiagnostics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReponseDiagnostics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReponseDiagnostics.
     */
    distinct?: ReponseDiagnosticScalarFieldEnum | ReponseDiagnosticScalarFieldEnum[]
  }

  /**
   * ReponseDiagnostic findFirstOrThrow
   */
  export type ReponseDiagnosticFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReponseDiagnostic
     */
    select?: ReponseDiagnosticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReponseDiagnostic
     */
    omit?: ReponseDiagnosticOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReponseDiagnosticInclude<ExtArgs> | null
    /**
     * Filter, which ReponseDiagnostic to fetch.
     */
    where?: ReponseDiagnosticWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReponseDiagnostics to fetch.
     */
    orderBy?: ReponseDiagnosticOrderByWithRelationInput | ReponseDiagnosticOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReponseDiagnostics.
     */
    cursor?: ReponseDiagnosticWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReponseDiagnostics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReponseDiagnostics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReponseDiagnostics.
     */
    distinct?: ReponseDiagnosticScalarFieldEnum | ReponseDiagnosticScalarFieldEnum[]
  }

  /**
   * ReponseDiagnostic findMany
   */
  export type ReponseDiagnosticFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReponseDiagnostic
     */
    select?: ReponseDiagnosticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReponseDiagnostic
     */
    omit?: ReponseDiagnosticOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReponseDiagnosticInclude<ExtArgs> | null
    /**
     * Filter, which ReponseDiagnostics to fetch.
     */
    where?: ReponseDiagnosticWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReponseDiagnostics to fetch.
     */
    orderBy?: ReponseDiagnosticOrderByWithRelationInput | ReponseDiagnosticOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReponseDiagnostics.
     */
    cursor?: ReponseDiagnosticWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReponseDiagnostics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReponseDiagnostics.
     */
    skip?: number
    distinct?: ReponseDiagnosticScalarFieldEnum | ReponseDiagnosticScalarFieldEnum[]
  }

  /**
   * ReponseDiagnostic create
   */
  export type ReponseDiagnosticCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReponseDiagnostic
     */
    select?: ReponseDiagnosticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReponseDiagnostic
     */
    omit?: ReponseDiagnosticOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReponseDiagnosticInclude<ExtArgs> | null
    /**
     * The data needed to create a ReponseDiagnostic.
     */
    data: XOR<ReponseDiagnosticCreateInput, ReponseDiagnosticUncheckedCreateInput>
  }

  /**
   * ReponseDiagnostic createMany
   */
  export type ReponseDiagnosticCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReponseDiagnostics.
     */
    data: ReponseDiagnosticCreateManyInput | ReponseDiagnosticCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReponseDiagnostic update
   */
  export type ReponseDiagnosticUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReponseDiagnostic
     */
    select?: ReponseDiagnosticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReponseDiagnostic
     */
    omit?: ReponseDiagnosticOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReponseDiagnosticInclude<ExtArgs> | null
    /**
     * The data needed to update a ReponseDiagnostic.
     */
    data: XOR<ReponseDiagnosticUpdateInput, ReponseDiagnosticUncheckedUpdateInput>
    /**
     * Choose, which ReponseDiagnostic to update.
     */
    where: ReponseDiagnosticWhereUniqueInput
  }

  /**
   * ReponseDiagnostic updateMany
   */
  export type ReponseDiagnosticUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReponseDiagnostics.
     */
    data: XOR<ReponseDiagnosticUpdateManyMutationInput, ReponseDiagnosticUncheckedUpdateManyInput>
    /**
     * Filter which ReponseDiagnostics to update
     */
    where?: ReponseDiagnosticWhereInput
    /**
     * Limit how many ReponseDiagnostics to update.
     */
    limit?: number
  }

  /**
   * ReponseDiagnostic upsert
   */
  export type ReponseDiagnosticUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReponseDiagnostic
     */
    select?: ReponseDiagnosticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReponseDiagnostic
     */
    omit?: ReponseDiagnosticOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReponseDiagnosticInclude<ExtArgs> | null
    /**
     * The filter to search for the ReponseDiagnostic to update in case it exists.
     */
    where: ReponseDiagnosticWhereUniqueInput
    /**
     * In case the ReponseDiagnostic found by the `where` argument doesn't exist, create a new ReponseDiagnostic with this data.
     */
    create: XOR<ReponseDiagnosticCreateInput, ReponseDiagnosticUncheckedCreateInput>
    /**
     * In case the ReponseDiagnostic was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReponseDiagnosticUpdateInput, ReponseDiagnosticUncheckedUpdateInput>
  }

  /**
   * ReponseDiagnostic delete
   */
  export type ReponseDiagnosticDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReponseDiagnostic
     */
    select?: ReponseDiagnosticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReponseDiagnostic
     */
    omit?: ReponseDiagnosticOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReponseDiagnosticInclude<ExtArgs> | null
    /**
     * Filter which ReponseDiagnostic to delete.
     */
    where: ReponseDiagnosticWhereUniqueInput
  }

  /**
   * ReponseDiagnostic deleteMany
   */
  export type ReponseDiagnosticDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReponseDiagnostics to delete
     */
    where?: ReponseDiagnosticWhereInput
    /**
     * Limit how many ReponseDiagnostics to delete.
     */
    limit?: number
  }

  /**
   * ReponseDiagnostic without action
   */
  export type ReponseDiagnosticDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReponseDiagnostic
     */
    select?: ReponseDiagnosticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReponseDiagnostic
     */
    omit?: ReponseDiagnosticOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReponseDiagnosticInclude<ExtArgs> | null
  }


  /**
   * Model EmotionNiveau1
   */

  export type AggregateEmotionNiveau1 = {
    _count: EmotionNiveau1CountAggregateOutputType | null
    _min: EmotionNiveau1MinAggregateOutputType | null
    _max: EmotionNiveau1MaxAggregateOutputType | null
  }

  export type EmotionNiveau1MinAggregateOutputType = {
    id: string | null
    libelle: string | null
  }

  export type EmotionNiveau1MaxAggregateOutputType = {
    id: string | null
    libelle: string | null
  }

  export type EmotionNiveau1CountAggregateOutputType = {
    id: number
    libelle: number
    _all: number
  }


  export type EmotionNiveau1MinAggregateInputType = {
    id?: true
    libelle?: true
  }

  export type EmotionNiveau1MaxAggregateInputType = {
    id?: true
    libelle?: true
  }

  export type EmotionNiveau1CountAggregateInputType = {
    id?: true
    libelle?: true
    _all?: true
  }

  export type EmotionNiveau1AggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmotionNiveau1 to aggregate.
     */
    where?: EmotionNiveau1WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmotionNiveau1s to fetch.
     */
    orderBy?: EmotionNiveau1OrderByWithRelationInput | EmotionNiveau1OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmotionNiveau1WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmotionNiveau1s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmotionNiveau1s.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmotionNiveau1s
    **/
    _count?: true | EmotionNiveau1CountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmotionNiveau1MinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmotionNiveau1MaxAggregateInputType
  }

  export type GetEmotionNiveau1AggregateType<T extends EmotionNiveau1AggregateArgs> = {
        [P in keyof T & keyof AggregateEmotionNiveau1]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmotionNiveau1[P]>
      : GetScalarType<T[P], AggregateEmotionNiveau1[P]>
  }




  export type EmotionNiveau1GroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmotionNiveau1WhereInput
    orderBy?: EmotionNiveau1OrderByWithAggregationInput | EmotionNiveau1OrderByWithAggregationInput[]
    by: EmotionNiveau1ScalarFieldEnum[] | EmotionNiveau1ScalarFieldEnum
    having?: EmotionNiveau1ScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmotionNiveau1CountAggregateInputType | true
    _min?: EmotionNiveau1MinAggregateInputType
    _max?: EmotionNiveau1MaxAggregateInputType
  }

  export type EmotionNiveau1GroupByOutputType = {
    id: string
    libelle: string
    _count: EmotionNiveau1CountAggregateOutputType | null
    _min: EmotionNiveau1MinAggregateOutputType | null
    _max: EmotionNiveau1MaxAggregateOutputType | null
  }

  type GetEmotionNiveau1GroupByPayload<T extends EmotionNiveau1GroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmotionNiveau1GroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmotionNiveau1GroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmotionNiveau1GroupByOutputType[P]>
            : GetScalarType<T[P], EmotionNiveau1GroupByOutputType[P]>
        }
      >
    >


  export type EmotionNiveau1Select<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    libelle?: boolean
    emotionsN2?: boolean | EmotionNiveau1$emotionsN2Args<ExtArgs>
    _count?: boolean | EmotionNiveau1CountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emotionNiveau1"]>



  export type EmotionNiveau1SelectScalar = {
    id?: boolean
    libelle?: boolean
  }

  export type EmotionNiveau1Omit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "libelle", ExtArgs["result"]["emotionNiveau1"]>
  export type EmotionNiveau1Include<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emotionsN2?: boolean | EmotionNiveau1$emotionsN2Args<ExtArgs>
    _count?: boolean | EmotionNiveau1CountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $EmotionNiveau1Payload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmotionNiveau1"
    objects: {
      emotionsN2: Prisma.$EmotionNiveau2Payload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      libelle: string
    }, ExtArgs["result"]["emotionNiveau1"]>
    composites: {}
  }

  type EmotionNiveau1GetPayload<S extends boolean | null | undefined | EmotionNiveau1DefaultArgs> = $Result.GetResult<Prisma.$EmotionNiveau1Payload, S>

  type EmotionNiveau1CountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmotionNiveau1FindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmotionNiveau1CountAggregateInputType | true
    }

  export interface EmotionNiveau1Delegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmotionNiveau1'], meta: { name: 'EmotionNiveau1' } }
    /**
     * Find zero or one EmotionNiveau1 that matches the filter.
     * @param {EmotionNiveau1FindUniqueArgs} args - Arguments to find a EmotionNiveau1
     * @example
     * // Get one EmotionNiveau1
     * const emotionNiveau1 = await prisma.emotionNiveau1.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmotionNiveau1FindUniqueArgs>(args: SelectSubset<T, EmotionNiveau1FindUniqueArgs<ExtArgs>>): Prisma__EmotionNiveau1Client<$Result.GetResult<Prisma.$EmotionNiveau1Payload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmotionNiveau1 that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmotionNiveau1FindUniqueOrThrowArgs} args - Arguments to find a EmotionNiveau1
     * @example
     * // Get one EmotionNiveau1
     * const emotionNiveau1 = await prisma.emotionNiveau1.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmotionNiveau1FindUniqueOrThrowArgs>(args: SelectSubset<T, EmotionNiveau1FindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmotionNiveau1Client<$Result.GetResult<Prisma.$EmotionNiveau1Payload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmotionNiveau1 that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmotionNiveau1FindFirstArgs} args - Arguments to find a EmotionNiveau1
     * @example
     * // Get one EmotionNiveau1
     * const emotionNiveau1 = await prisma.emotionNiveau1.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmotionNiveau1FindFirstArgs>(args?: SelectSubset<T, EmotionNiveau1FindFirstArgs<ExtArgs>>): Prisma__EmotionNiveau1Client<$Result.GetResult<Prisma.$EmotionNiveau1Payload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmotionNiveau1 that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmotionNiveau1FindFirstOrThrowArgs} args - Arguments to find a EmotionNiveau1
     * @example
     * // Get one EmotionNiveau1
     * const emotionNiveau1 = await prisma.emotionNiveau1.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmotionNiveau1FindFirstOrThrowArgs>(args?: SelectSubset<T, EmotionNiveau1FindFirstOrThrowArgs<ExtArgs>>): Prisma__EmotionNiveau1Client<$Result.GetResult<Prisma.$EmotionNiveau1Payload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmotionNiveau1s that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmotionNiveau1FindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmotionNiveau1s
     * const emotionNiveau1s = await prisma.emotionNiveau1.findMany()
     * 
     * // Get first 10 EmotionNiveau1s
     * const emotionNiveau1s = await prisma.emotionNiveau1.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emotionNiveau1WithIdOnly = await prisma.emotionNiveau1.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmotionNiveau1FindManyArgs>(args?: SelectSubset<T, EmotionNiveau1FindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmotionNiveau1Payload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmotionNiveau1.
     * @param {EmotionNiveau1CreateArgs} args - Arguments to create a EmotionNiveau1.
     * @example
     * // Create one EmotionNiveau1
     * const EmotionNiveau1 = await prisma.emotionNiveau1.create({
     *   data: {
     *     // ... data to create a EmotionNiveau1
     *   }
     * })
     * 
     */
    create<T extends EmotionNiveau1CreateArgs>(args: SelectSubset<T, EmotionNiveau1CreateArgs<ExtArgs>>): Prisma__EmotionNiveau1Client<$Result.GetResult<Prisma.$EmotionNiveau1Payload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmotionNiveau1s.
     * @param {EmotionNiveau1CreateManyArgs} args - Arguments to create many EmotionNiveau1s.
     * @example
     * // Create many EmotionNiveau1s
     * const emotionNiveau1 = await prisma.emotionNiveau1.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmotionNiveau1CreateManyArgs>(args?: SelectSubset<T, EmotionNiveau1CreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a EmotionNiveau1.
     * @param {EmotionNiveau1DeleteArgs} args - Arguments to delete one EmotionNiveau1.
     * @example
     * // Delete one EmotionNiveau1
     * const EmotionNiveau1 = await prisma.emotionNiveau1.delete({
     *   where: {
     *     // ... filter to delete one EmotionNiveau1
     *   }
     * })
     * 
     */
    delete<T extends EmotionNiveau1DeleteArgs>(args: SelectSubset<T, EmotionNiveau1DeleteArgs<ExtArgs>>): Prisma__EmotionNiveau1Client<$Result.GetResult<Prisma.$EmotionNiveau1Payload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmotionNiveau1.
     * @param {EmotionNiveau1UpdateArgs} args - Arguments to update one EmotionNiveau1.
     * @example
     * // Update one EmotionNiveau1
     * const emotionNiveau1 = await prisma.emotionNiveau1.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmotionNiveau1UpdateArgs>(args: SelectSubset<T, EmotionNiveau1UpdateArgs<ExtArgs>>): Prisma__EmotionNiveau1Client<$Result.GetResult<Prisma.$EmotionNiveau1Payload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmotionNiveau1s.
     * @param {EmotionNiveau1DeleteManyArgs} args - Arguments to filter EmotionNiveau1s to delete.
     * @example
     * // Delete a few EmotionNiveau1s
     * const { count } = await prisma.emotionNiveau1.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmotionNiveau1DeleteManyArgs>(args?: SelectSubset<T, EmotionNiveau1DeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmotionNiveau1s.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmotionNiveau1UpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmotionNiveau1s
     * const emotionNiveau1 = await prisma.emotionNiveau1.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmotionNiveau1UpdateManyArgs>(args: SelectSubset<T, EmotionNiveau1UpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EmotionNiveau1.
     * @param {EmotionNiveau1UpsertArgs} args - Arguments to update or create a EmotionNiveau1.
     * @example
     * // Update or create a EmotionNiveau1
     * const emotionNiveau1 = await prisma.emotionNiveau1.upsert({
     *   create: {
     *     // ... data to create a EmotionNiveau1
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmotionNiveau1 we want to update
     *   }
     * })
     */
    upsert<T extends EmotionNiveau1UpsertArgs>(args: SelectSubset<T, EmotionNiveau1UpsertArgs<ExtArgs>>): Prisma__EmotionNiveau1Client<$Result.GetResult<Prisma.$EmotionNiveau1Payload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmotionNiveau1s.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmotionNiveau1CountArgs} args - Arguments to filter EmotionNiveau1s to count.
     * @example
     * // Count the number of EmotionNiveau1s
     * const count = await prisma.emotionNiveau1.count({
     *   where: {
     *     // ... the filter for the EmotionNiveau1s we want to count
     *   }
     * })
    **/
    count<T extends EmotionNiveau1CountArgs>(
      args?: Subset<T, EmotionNiveau1CountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmotionNiveau1CountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmotionNiveau1.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmotionNiveau1AggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmotionNiveau1AggregateArgs>(args: Subset<T, EmotionNiveau1AggregateArgs>): Prisma.PrismaPromise<GetEmotionNiveau1AggregateType<T>>

    /**
     * Group by EmotionNiveau1.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmotionNiveau1GroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmotionNiveau1GroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmotionNiveau1GroupByArgs['orderBy'] }
        : { orderBy?: EmotionNiveau1GroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmotionNiveau1GroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmotionNiveau1GroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmotionNiveau1 model
   */
  readonly fields: EmotionNiveau1FieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmotionNiveau1.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmotionNiveau1Client<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    emotionsN2<T extends EmotionNiveau1$emotionsN2Args<ExtArgs> = {}>(args?: Subset<T, EmotionNiveau1$emotionsN2Args<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmotionNiveau2Payload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmotionNiveau1 model
   */
  interface EmotionNiveau1FieldRefs {
    readonly id: FieldRef<"EmotionNiveau1", 'String'>
    readonly libelle: FieldRef<"EmotionNiveau1", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EmotionNiveau1 findUnique
   */
  export type EmotionNiveau1FindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmotionNiveau1
     */
    select?: EmotionNiveau1Select<ExtArgs> | null
    /**
     * Omit specific fields from the EmotionNiveau1
     */
    omit?: EmotionNiveau1Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmotionNiveau1Include<ExtArgs> | null
    /**
     * Filter, which EmotionNiveau1 to fetch.
     */
    where: EmotionNiveau1WhereUniqueInput
  }

  /**
   * EmotionNiveau1 findUniqueOrThrow
   */
  export type EmotionNiveau1FindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmotionNiveau1
     */
    select?: EmotionNiveau1Select<ExtArgs> | null
    /**
     * Omit specific fields from the EmotionNiveau1
     */
    omit?: EmotionNiveau1Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmotionNiveau1Include<ExtArgs> | null
    /**
     * Filter, which EmotionNiveau1 to fetch.
     */
    where: EmotionNiveau1WhereUniqueInput
  }

  /**
   * EmotionNiveau1 findFirst
   */
  export type EmotionNiveau1FindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmotionNiveau1
     */
    select?: EmotionNiveau1Select<ExtArgs> | null
    /**
     * Omit specific fields from the EmotionNiveau1
     */
    omit?: EmotionNiveau1Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmotionNiveau1Include<ExtArgs> | null
    /**
     * Filter, which EmotionNiveau1 to fetch.
     */
    where?: EmotionNiveau1WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmotionNiveau1s to fetch.
     */
    orderBy?: EmotionNiveau1OrderByWithRelationInput | EmotionNiveau1OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmotionNiveau1s.
     */
    cursor?: EmotionNiveau1WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmotionNiveau1s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmotionNiveau1s.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmotionNiveau1s.
     */
    distinct?: EmotionNiveau1ScalarFieldEnum | EmotionNiveau1ScalarFieldEnum[]
  }

  /**
   * EmotionNiveau1 findFirstOrThrow
   */
  export type EmotionNiveau1FindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmotionNiveau1
     */
    select?: EmotionNiveau1Select<ExtArgs> | null
    /**
     * Omit specific fields from the EmotionNiveau1
     */
    omit?: EmotionNiveau1Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmotionNiveau1Include<ExtArgs> | null
    /**
     * Filter, which EmotionNiveau1 to fetch.
     */
    where?: EmotionNiveau1WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmotionNiveau1s to fetch.
     */
    orderBy?: EmotionNiveau1OrderByWithRelationInput | EmotionNiveau1OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmotionNiveau1s.
     */
    cursor?: EmotionNiveau1WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmotionNiveau1s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmotionNiveau1s.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmotionNiveau1s.
     */
    distinct?: EmotionNiveau1ScalarFieldEnum | EmotionNiveau1ScalarFieldEnum[]
  }

  /**
   * EmotionNiveau1 findMany
   */
  export type EmotionNiveau1FindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmotionNiveau1
     */
    select?: EmotionNiveau1Select<ExtArgs> | null
    /**
     * Omit specific fields from the EmotionNiveau1
     */
    omit?: EmotionNiveau1Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmotionNiveau1Include<ExtArgs> | null
    /**
     * Filter, which EmotionNiveau1s to fetch.
     */
    where?: EmotionNiveau1WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmotionNiveau1s to fetch.
     */
    orderBy?: EmotionNiveau1OrderByWithRelationInput | EmotionNiveau1OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmotionNiveau1s.
     */
    cursor?: EmotionNiveau1WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmotionNiveau1s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmotionNiveau1s.
     */
    skip?: number
    distinct?: EmotionNiveau1ScalarFieldEnum | EmotionNiveau1ScalarFieldEnum[]
  }

  /**
   * EmotionNiveau1 create
   */
  export type EmotionNiveau1CreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmotionNiveau1
     */
    select?: EmotionNiveau1Select<ExtArgs> | null
    /**
     * Omit specific fields from the EmotionNiveau1
     */
    omit?: EmotionNiveau1Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmotionNiveau1Include<ExtArgs> | null
    /**
     * The data needed to create a EmotionNiveau1.
     */
    data: XOR<EmotionNiveau1CreateInput, EmotionNiveau1UncheckedCreateInput>
  }

  /**
   * EmotionNiveau1 createMany
   */
  export type EmotionNiveau1CreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmotionNiveau1s.
     */
    data: EmotionNiveau1CreateManyInput | EmotionNiveau1CreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmotionNiveau1 update
   */
  export type EmotionNiveau1UpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmotionNiveau1
     */
    select?: EmotionNiveau1Select<ExtArgs> | null
    /**
     * Omit specific fields from the EmotionNiveau1
     */
    omit?: EmotionNiveau1Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmotionNiveau1Include<ExtArgs> | null
    /**
     * The data needed to update a EmotionNiveau1.
     */
    data: XOR<EmotionNiveau1UpdateInput, EmotionNiveau1UncheckedUpdateInput>
    /**
     * Choose, which EmotionNiveau1 to update.
     */
    where: EmotionNiveau1WhereUniqueInput
  }

  /**
   * EmotionNiveau1 updateMany
   */
  export type EmotionNiveau1UpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmotionNiveau1s.
     */
    data: XOR<EmotionNiveau1UpdateManyMutationInput, EmotionNiveau1UncheckedUpdateManyInput>
    /**
     * Filter which EmotionNiveau1s to update
     */
    where?: EmotionNiveau1WhereInput
    /**
     * Limit how many EmotionNiveau1s to update.
     */
    limit?: number
  }

  /**
   * EmotionNiveau1 upsert
   */
  export type EmotionNiveau1UpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmotionNiveau1
     */
    select?: EmotionNiveau1Select<ExtArgs> | null
    /**
     * Omit specific fields from the EmotionNiveau1
     */
    omit?: EmotionNiveau1Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmotionNiveau1Include<ExtArgs> | null
    /**
     * The filter to search for the EmotionNiveau1 to update in case it exists.
     */
    where: EmotionNiveau1WhereUniqueInput
    /**
     * In case the EmotionNiveau1 found by the `where` argument doesn't exist, create a new EmotionNiveau1 with this data.
     */
    create: XOR<EmotionNiveau1CreateInput, EmotionNiveau1UncheckedCreateInput>
    /**
     * In case the EmotionNiveau1 was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmotionNiveau1UpdateInput, EmotionNiveau1UncheckedUpdateInput>
  }

  /**
   * EmotionNiveau1 delete
   */
  export type EmotionNiveau1DeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmotionNiveau1
     */
    select?: EmotionNiveau1Select<ExtArgs> | null
    /**
     * Omit specific fields from the EmotionNiveau1
     */
    omit?: EmotionNiveau1Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmotionNiveau1Include<ExtArgs> | null
    /**
     * Filter which EmotionNiveau1 to delete.
     */
    where: EmotionNiveau1WhereUniqueInput
  }

  /**
   * EmotionNiveau1 deleteMany
   */
  export type EmotionNiveau1DeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmotionNiveau1s to delete
     */
    where?: EmotionNiveau1WhereInput
    /**
     * Limit how many EmotionNiveau1s to delete.
     */
    limit?: number
  }

  /**
   * EmotionNiveau1.emotionsN2
   */
  export type EmotionNiveau1$emotionsN2Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmotionNiveau2
     */
    select?: EmotionNiveau2Select<ExtArgs> | null
    /**
     * Omit specific fields from the EmotionNiveau2
     */
    omit?: EmotionNiveau2Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmotionNiveau2Include<ExtArgs> | null
    where?: EmotionNiveau2WhereInput
    orderBy?: EmotionNiveau2OrderByWithRelationInput | EmotionNiveau2OrderByWithRelationInput[]
    cursor?: EmotionNiveau2WhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmotionNiveau2ScalarFieldEnum | EmotionNiveau2ScalarFieldEnum[]
  }

  /**
   * EmotionNiveau1 without action
   */
  export type EmotionNiveau1DefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmotionNiveau1
     */
    select?: EmotionNiveau1Select<ExtArgs> | null
    /**
     * Omit specific fields from the EmotionNiveau1
     */
    omit?: EmotionNiveau1Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmotionNiveau1Include<ExtArgs> | null
  }


  /**
   * Model EmotionNiveau2
   */

  export type AggregateEmotionNiveau2 = {
    _count: EmotionNiveau2CountAggregateOutputType | null
    _min: EmotionNiveau2MinAggregateOutputType | null
    _max: EmotionNiveau2MaxAggregateOutputType | null
  }

  export type EmotionNiveau2MinAggregateOutputType = {
    id: string | null
    libelle: string | null
    emotionN1Id: string | null
  }

  export type EmotionNiveau2MaxAggregateOutputType = {
    id: string | null
    libelle: string | null
    emotionN1Id: string | null
  }

  export type EmotionNiveau2CountAggregateOutputType = {
    id: number
    libelle: number
    emotionN1Id: number
    _all: number
  }


  export type EmotionNiveau2MinAggregateInputType = {
    id?: true
    libelle?: true
    emotionN1Id?: true
  }

  export type EmotionNiveau2MaxAggregateInputType = {
    id?: true
    libelle?: true
    emotionN1Id?: true
  }

  export type EmotionNiveau2CountAggregateInputType = {
    id?: true
    libelle?: true
    emotionN1Id?: true
    _all?: true
  }

  export type EmotionNiveau2AggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmotionNiveau2 to aggregate.
     */
    where?: EmotionNiveau2WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmotionNiveau2s to fetch.
     */
    orderBy?: EmotionNiveau2OrderByWithRelationInput | EmotionNiveau2OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmotionNiveau2WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmotionNiveau2s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmotionNiveau2s.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmotionNiveau2s
    **/
    _count?: true | EmotionNiveau2CountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmotionNiveau2MinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmotionNiveau2MaxAggregateInputType
  }

  export type GetEmotionNiveau2AggregateType<T extends EmotionNiveau2AggregateArgs> = {
        [P in keyof T & keyof AggregateEmotionNiveau2]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmotionNiveau2[P]>
      : GetScalarType<T[P], AggregateEmotionNiveau2[P]>
  }




  export type EmotionNiveau2GroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmotionNiveau2WhereInput
    orderBy?: EmotionNiveau2OrderByWithAggregationInput | EmotionNiveau2OrderByWithAggregationInput[]
    by: EmotionNiveau2ScalarFieldEnum[] | EmotionNiveau2ScalarFieldEnum
    having?: EmotionNiveau2ScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmotionNiveau2CountAggregateInputType | true
    _min?: EmotionNiveau2MinAggregateInputType
    _max?: EmotionNiveau2MaxAggregateInputType
  }

  export type EmotionNiveau2GroupByOutputType = {
    id: string
    libelle: string
    emotionN1Id: string
    _count: EmotionNiveau2CountAggregateOutputType | null
    _min: EmotionNiveau2MinAggregateOutputType | null
    _max: EmotionNiveau2MaxAggregateOutputType | null
  }

  type GetEmotionNiveau2GroupByPayload<T extends EmotionNiveau2GroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmotionNiveau2GroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmotionNiveau2GroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmotionNiveau2GroupByOutputType[P]>
            : GetScalarType<T[P], EmotionNiveau2GroupByOutputType[P]>
        }
      >
    >


  export type EmotionNiveau2Select<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    libelle?: boolean
    emotionN1Id?: boolean
    emotionN1?: boolean | EmotionNiveau1DefaultArgs<ExtArgs>
    journaux?: boolean | EmotionNiveau2$journauxArgs<ExtArgs>
    _count?: boolean | EmotionNiveau2CountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emotionNiveau2"]>



  export type EmotionNiveau2SelectScalar = {
    id?: boolean
    libelle?: boolean
    emotionN1Id?: boolean
  }

  export type EmotionNiveau2Omit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "libelle" | "emotionN1Id", ExtArgs["result"]["emotionNiveau2"]>
  export type EmotionNiveau2Include<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emotionN1?: boolean | EmotionNiveau1DefaultArgs<ExtArgs>
    journaux?: boolean | EmotionNiveau2$journauxArgs<ExtArgs>
    _count?: boolean | EmotionNiveau2CountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $EmotionNiveau2Payload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmotionNiveau2"
    objects: {
      emotionN1: Prisma.$EmotionNiveau1Payload<ExtArgs>
      journaux: Prisma.$JournalEmotionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      libelle: string
      emotionN1Id: string
    }, ExtArgs["result"]["emotionNiveau2"]>
    composites: {}
  }

  type EmotionNiveau2GetPayload<S extends boolean | null | undefined | EmotionNiveau2DefaultArgs> = $Result.GetResult<Prisma.$EmotionNiveau2Payload, S>

  type EmotionNiveau2CountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmotionNiveau2FindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmotionNiveau2CountAggregateInputType | true
    }

  export interface EmotionNiveau2Delegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmotionNiveau2'], meta: { name: 'EmotionNiveau2' } }
    /**
     * Find zero or one EmotionNiveau2 that matches the filter.
     * @param {EmotionNiveau2FindUniqueArgs} args - Arguments to find a EmotionNiveau2
     * @example
     * // Get one EmotionNiveau2
     * const emotionNiveau2 = await prisma.emotionNiveau2.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmotionNiveau2FindUniqueArgs>(args: SelectSubset<T, EmotionNiveau2FindUniqueArgs<ExtArgs>>): Prisma__EmotionNiveau2Client<$Result.GetResult<Prisma.$EmotionNiveau2Payload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmotionNiveau2 that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmotionNiveau2FindUniqueOrThrowArgs} args - Arguments to find a EmotionNiveau2
     * @example
     * // Get one EmotionNiveau2
     * const emotionNiveau2 = await prisma.emotionNiveau2.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmotionNiveau2FindUniqueOrThrowArgs>(args: SelectSubset<T, EmotionNiveau2FindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmotionNiveau2Client<$Result.GetResult<Prisma.$EmotionNiveau2Payload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmotionNiveau2 that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmotionNiveau2FindFirstArgs} args - Arguments to find a EmotionNiveau2
     * @example
     * // Get one EmotionNiveau2
     * const emotionNiveau2 = await prisma.emotionNiveau2.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmotionNiveau2FindFirstArgs>(args?: SelectSubset<T, EmotionNiveau2FindFirstArgs<ExtArgs>>): Prisma__EmotionNiveau2Client<$Result.GetResult<Prisma.$EmotionNiveau2Payload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmotionNiveau2 that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmotionNiveau2FindFirstOrThrowArgs} args - Arguments to find a EmotionNiveau2
     * @example
     * // Get one EmotionNiveau2
     * const emotionNiveau2 = await prisma.emotionNiveau2.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmotionNiveau2FindFirstOrThrowArgs>(args?: SelectSubset<T, EmotionNiveau2FindFirstOrThrowArgs<ExtArgs>>): Prisma__EmotionNiveau2Client<$Result.GetResult<Prisma.$EmotionNiveau2Payload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmotionNiveau2s that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmotionNiveau2FindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmotionNiveau2s
     * const emotionNiveau2s = await prisma.emotionNiveau2.findMany()
     * 
     * // Get first 10 EmotionNiveau2s
     * const emotionNiveau2s = await prisma.emotionNiveau2.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emotionNiveau2WithIdOnly = await prisma.emotionNiveau2.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmotionNiveau2FindManyArgs>(args?: SelectSubset<T, EmotionNiveau2FindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmotionNiveau2Payload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmotionNiveau2.
     * @param {EmotionNiveau2CreateArgs} args - Arguments to create a EmotionNiveau2.
     * @example
     * // Create one EmotionNiveau2
     * const EmotionNiveau2 = await prisma.emotionNiveau2.create({
     *   data: {
     *     // ... data to create a EmotionNiveau2
     *   }
     * })
     * 
     */
    create<T extends EmotionNiveau2CreateArgs>(args: SelectSubset<T, EmotionNiveau2CreateArgs<ExtArgs>>): Prisma__EmotionNiveau2Client<$Result.GetResult<Prisma.$EmotionNiveau2Payload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmotionNiveau2s.
     * @param {EmotionNiveau2CreateManyArgs} args - Arguments to create many EmotionNiveau2s.
     * @example
     * // Create many EmotionNiveau2s
     * const emotionNiveau2 = await prisma.emotionNiveau2.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmotionNiveau2CreateManyArgs>(args?: SelectSubset<T, EmotionNiveau2CreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a EmotionNiveau2.
     * @param {EmotionNiveau2DeleteArgs} args - Arguments to delete one EmotionNiveau2.
     * @example
     * // Delete one EmotionNiveau2
     * const EmotionNiveau2 = await prisma.emotionNiveau2.delete({
     *   where: {
     *     // ... filter to delete one EmotionNiveau2
     *   }
     * })
     * 
     */
    delete<T extends EmotionNiveau2DeleteArgs>(args: SelectSubset<T, EmotionNiveau2DeleteArgs<ExtArgs>>): Prisma__EmotionNiveau2Client<$Result.GetResult<Prisma.$EmotionNiveau2Payload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmotionNiveau2.
     * @param {EmotionNiveau2UpdateArgs} args - Arguments to update one EmotionNiveau2.
     * @example
     * // Update one EmotionNiveau2
     * const emotionNiveau2 = await prisma.emotionNiveau2.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmotionNiveau2UpdateArgs>(args: SelectSubset<T, EmotionNiveau2UpdateArgs<ExtArgs>>): Prisma__EmotionNiveau2Client<$Result.GetResult<Prisma.$EmotionNiveau2Payload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmotionNiveau2s.
     * @param {EmotionNiveau2DeleteManyArgs} args - Arguments to filter EmotionNiveau2s to delete.
     * @example
     * // Delete a few EmotionNiveau2s
     * const { count } = await prisma.emotionNiveau2.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmotionNiveau2DeleteManyArgs>(args?: SelectSubset<T, EmotionNiveau2DeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmotionNiveau2s.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmotionNiveau2UpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmotionNiveau2s
     * const emotionNiveau2 = await prisma.emotionNiveau2.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmotionNiveau2UpdateManyArgs>(args: SelectSubset<T, EmotionNiveau2UpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EmotionNiveau2.
     * @param {EmotionNiveau2UpsertArgs} args - Arguments to update or create a EmotionNiveau2.
     * @example
     * // Update or create a EmotionNiveau2
     * const emotionNiveau2 = await prisma.emotionNiveau2.upsert({
     *   create: {
     *     // ... data to create a EmotionNiveau2
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmotionNiveau2 we want to update
     *   }
     * })
     */
    upsert<T extends EmotionNiveau2UpsertArgs>(args: SelectSubset<T, EmotionNiveau2UpsertArgs<ExtArgs>>): Prisma__EmotionNiveau2Client<$Result.GetResult<Prisma.$EmotionNiveau2Payload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmotionNiveau2s.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmotionNiveau2CountArgs} args - Arguments to filter EmotionNiveau2s to count.
     * @example
     * // Count the number of EmotionNiveau2s
     * const count = await prisma.emotionNiveau2.count({
     *   where: {
     *     // ... the filter for the EmotionNiveau2s we want to count
     *   }
     * })
    **/
    count<T extends EmotionNiveau2CountArgs>(
      args?: Subset<T, EmotionNiveau2CountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmotionNiveau2CountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmotionNiveau2.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmotionNiveau2AggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmotionNiveau2AggregateArgs>(args: Subset<T, EmotionNiveau2AggregateArgs>): Prisma.PrismaPromise<GetEmotionNiveau2AggregateType<T>>

    /**
     * Group by EmotionNiveau2.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmotionNiveau2GroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmotionNiveau2GroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmotionNiveau2GroupByArgs['orderBy'] }
        : { orderBy?: EmotionNiveau2GroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmotionNiveau2GroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmotionNiveau2GroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmotionNiveau2 model
   */
  readonly fields: EmotionNiveau2FieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmotionNiveau2.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmotionNiveau2Client<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    emotionN1<T extends EmotionNiveau1DefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmotionNiveau1DefaultArgs<ExtArgs>>): Prisma__EmotionNiveau1Client<$Result.GetResult<Prisma.$EmotionNiveau1Payload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    journaux<T extends EmotionNiveau2$journauxArgs<ExtArgs> = {}>(args?: Subset<T, EmotionNiveau2$journauxArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JournalEmotionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmotionNiveau2 model
   */
  interface EmotionNiveau2FieldRefs {
    readonly id: FieldRef<"EmotionNiveau2", 'String'>
    readonly libelle: FieldRef<"EmotionNiveau2", 'String'>
    readonly emotionN1Id: FieldRef<"EmotionNiveau2", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EmotionNiveau2 findUnique
   */
  export type EmotionNiveau2FindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmotionNiveau2
     */
    select?: EmotionNiveau2Select<ExtArgs> | null
    /**
     * Omit specific fields from the EmotionNiveau2
     */
    omit?: EmotionNiveau2Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmotionNiveau2Include<ExtArgs> | null
    /**
     * Filter, which EmotionNiveau2 to fetch.
     */
    where: EmotionNiveau2WhereUniqueInput
  }

  /**
   * EmotionNiveau2 findUniqueOrThrow
   */
  export type EmotionNiveau2FindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmotionNiveau2
     */
    select?: EmotionNiveau2Select<ExtArgs> | null
    /**
     * Omit specific fields from the EmotionNiveau2
     */
    omit?: EmotionNiveau2Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmotionNiveau2Include<ExtArgs> | null
    /**
     * Filter, which EmotionNiveau2 to fetch.
     */
    where: EmotionNiveau2WhereUniqueInput
  }

  /**
   * EmotionNiveau2 findFirst
   */
  export type EmotionNiveau2FindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmotionNiveau2
     */
    select?: EmotionNiveau2Select<ExtArgs> | null
    /**
     * Omit specific fields from the EmotionNiveau2
     */
    omit?: EmotionNiveau2Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmotionNiveau2Include<ExtArgs> | null
    /**
     * Filter, which EmotionNiveau2 to fetch.
     */
    where?: EmotionNiveau2WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmotionNiveau2s to fetch.
     */
    orderBy?: EmotionNiveau2OrderByWithRelationInput | EmotionNiveau2OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmotionNiveau2s.
     */
    cursor?: EmotionNiveau2WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmotionNiveau2s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmotionNiveau2s.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmotionNiveau2s.
     */
    distinct?: EmotionNiveau2ScalarFieldEnum | EmotionNiveau2ScalarFieldEnum[]
  }

  /**
   * EmotionNiveau2 findFirstOrThrow
   */
  export type EmotionNiveau2FindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmotionNiveau2
     */
    select?: EmotionNiveau2Select<ExtArgs> | null
    /**
     * Omit specific fields from the EmotionNiveau2
     */
    omit?: EmotionNiveau2Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmotionNiveau2Include<ExtArgs> | null
    /**
     * Filter, which EmotionNiveau2 to fetch.
     */
    where?: EmotionNiveau2WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmotionNiveau2s to fetch.
     */
    orderBy?: EmotionNiveau2OrderByWithRelationInput | EmotionNiveau2OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmotionNiveau2s.
     */
    cursor?: EmotionNiveau2WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmotionNiveau2s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmotionNiveau2s.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmotionNiveau2s.
     */
    distinct?: EmotionNiveau2ScalarFieldEnum | EmotionNiveau2ScalarFieldEnum[]
  }

  /**
   * EmotionNiveau2 findMany
   */
  export type EmotionNiveau2FindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmotionNiveau2
     */
    select?: EmotionNiveau2Select<ExtArgs> | null
    /**
     * Omit specific fields from the EmotionNiveau2
     */
    omit?: EmotionNiveau2Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmotionNiveau2Include<ExtArgs> | null
    /**
     * Filter, which EmotionNiveau2s to fetch.
     */
    where?: EmotionNiveau2WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmotionNiveau2s to fetch.
     */
    orderBy?: EmotionNiveau2OrderByWithRelationInput | EmotionNiveau2OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmotionNiveau2s.
     */
    cursor?: EmotionNiveau2WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmotionNiveau2s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmotionNiveau2s.
     */
    skip?: number
    distinct?: EmotionNiveau2ScalarFieldEnum | EmotionNiveau2ScalarFieldEnum[]
  }

  /**
   * EmotionNiveau2 create
   */
  export type EmotionNiveau2CreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmotionNiveau2
     */
    select?: EmotionNiveau2Select<ExtArgs> | null
    /**
     * Omit specific fields from the EmotionNiveau2
     */
    omit?: EmotionNiveau2Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmotionNiveau2Include<ExtArgs> | null
    /**
     * The data needed to create a EmotionNiveau2.
     */
    data: XOR<EmotionNiveau2CreateInput, EmotionNiveau2UncheckedCreateInput>
  }

  /**
   * EmotionNiveau2 createMany
   */
  export type EmotionNiveau2CreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmotionNiveau2s.
     */
    data: EmotionNiveau2CreateManyInput | EmotionNiveau2CreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmotionNiveau2 update
   */
  export type EmotionNiveau2UpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmotionNiveau2
     */
    select?: EmotionNiveau2Select<ExtArgs> | null
    /**
     * Omit specific fields from the EmotionNiveau2
     */
    omit?: EmotionNiveau2Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmotionNiveau2Include<ExtArgs> | null
    /**
     * The data needed to update a EmotionNiveau2.
     */
    data: XOR<EmotionNiveau2UpdateInput, EmotionNiveau2UncheckedUpdateInput>
    /**
     * Choose, which EmotionNiveau2 to update.
     */
    where: EmotionNiveau2WhereUniqueInput
  }

  /**
   * EmotionNiveau2 updateMany
   */
  export type EmotionNiveau2UpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmotionNiveau2s.
     */
    data: XOR<EmotionNiveau2UpdateManyMutationInput, EmotionNiveau2UncheckedUpdateManyInput>
    /**
     * Filter which EmotionNiveau2s to update
     */
    where?: EmotionNiveau2WhereInput
    /**
     * Limit how many EmotionNiveau2s to update.
     */
    limit?: number
  }

  /**
   * EmotionNiveau2 upsert
   */
  export type EmotionNiveau2UpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmotionNiveau2
     */
    select?: EmotionNiveau2Select<ExtArgs> | null
    /**
     * Omit specific fields from the EmotionNiveau2
     */
    omit?: EmotionNiveau2Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmotionNiveau2Include<ExtArgs> | null
    /**
     * The filter to search for the EmotionNiveau2 to update in case it exists.
     */
    where: EmotionNiveau2WhereUniqueInput
    /**
     * In case the EmotionNiveau2 found by the `where` argument doesn't exist, create a new EmotionNiveau2 with this data.
     */
    create: XOR<EmotionNiveau2CreateInput, EmotionNiveau2UncheckedCreateInput>
    /**
     * In case the EmotionNiveau2 was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmotionNiveau2UpdateInput, EmotionNiveau2UncheckedUpdateInput>
  }

  /**
   * EmotionNiveau2 delete
   */
  export type EmotionNiveau2DeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmotionNiveau2
     */
    select?: EmotionNiveau2Select<ExtArgs> | null
    /**
     * Omit specific fields from the EmotionNiveau2
     */
    omit?: EmotionNiveau2Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmotionNiveau2Include<ExtArgs> | null
    /**
     * Filter which EmotionNiveau2 to delete.
     */
    where: EmotionNiveau2WhereUniqueInput
  }

  /**
   * EmotionNiveau2 deleteMany
   */
  export type EmotionNiveau2DeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmotionNiveau2s to delete
     */
    where?: EmotionNiveau2WhereInput
    /**
     * Limit how many EmotionNiveau2s to delete.
     */
    limit?: number
  }

  /**
   * EmotionNiveau2.journaux
   */
  export type EmotionNiveau2$journauxArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEmotion
     */
    select?: JournalEmotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEmotion
     */
    omit?: JournalEmotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEmotionInclude<ExtArgs> | null
    where?: JournalEmotionWhereInput
    orderBy?: JournalEmotionOrderByWithRelationInput | JournalEmotionOrderByWithRelationInput[]
    cursor?: JournalEmotionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JournalEmotionScalarFieldEnum | JournalEmotionScalarFieldEnum[]
  }

  /**
   * EmotionNiveau2 without action
   */
  export type EmotionNiveau2DefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmotionNiveau2
     */
    select?: EmotionNiveau2Select<ExtArgs> | null
    /**
     * Omit specific fields from the EmotionNiveau2
     */
    omit?: EmotionNiveau2Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmotionNiveau2Include<ExtArgs> | null
  }


  /**
   * Model JournalEmotion
   */

  export type AggregateJournalEmotion = {
    _count: JournalEmotionCountAggregateOutputType | null
    _min: JournalEmotionMinAggregateOutputType | null
    _max: JournalEmotionMaxAggregateOutputType | null
  }

  export type JournalEmotionMinAggregateOutputType = {
    id: string | null
    notePersonnelle: string | null
    dateEnregistrement: Date | null
    utilisateurId: string | null
    emotionN2Id: string | null
  }

  export type JournalEmotionMaxAggregateOutputType = {
    id: string | null
    notePersonnelle: string | null
    dateEnregistrement: Date | null
    utilisateurId: string | null
    emotionN2Id: string | null
  }

  export type JournalEmotionCountAggregateOutputType = {
    id: number
    notePersonnelle: number
    dateEnregistrement: number
    utilisateurId: number
    emotionN2Id: number
    _all: number
  }


  export type JournalEmotionMinAggregateInputType = {
    id?: true
    notePersonnelle?: true
    dateEnregistrement?: true
    utilisateurId?: true
    emotionN2Id?: true
  }

  export type JournalEmotionMaxAggregateInputType = {
    id?: true
    notePersonnelle?: true
    dateEnregistrement?: true
    utilisateurId?: true
    emotionN2Id?: true
  }

  export type JournalEmotionCountAggregateInputType = {
    id?: true
    notePersonnelle?: true
    dateEnregistrement?: true
    utilisateurId?: true
    emotionN2Id?: true
    _all?: true
  }

  export type JournalEmotionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JournalEmotion to aggregate.
     */
    where?: JournalEmotionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JournalEmotions to fetch.
     */
    orderBy?: JournalEmotionOrderByWithRelationInput | JournalEmotionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JournalEmotionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JournalEmotions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JournalEmotions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JournalEmotions
    **/
    _count?: true | JournalEmotionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JournalEmotionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JournalEmotionMaxAggregateInputType
  }

  export type GetJournalEmotionAggregateType<T extends JournalEmotionAggregateArgs> = {
        [P in keyof T & keyof AggregateJournalEmotion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJournalEmotion[P]>
      : GetScalarType<T[P], AggregateJournalEmotion[P]>
  }




  export type JournalEmotionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JournalEmotionWhereInput
    orderBy?: JournalEmotionOrderByWithAggregationInput | JournalEmotionOrderByWithAggregationInput[]
    by: JournalEmotionScalarFieldEnum[] | JournalEmotionScalarFieldEnum
    having?: JournalEmotionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JournalEmotionCountAggregateInputType | true
    _min?: JournalEmotionMinAggregateInputType
    _max?: JournalEmotionMaxAggregateInputType
  }

  export type JournalEmotionGroupByOutputType = {
    id: string
    notePersonnelle: string | null
    dateEnregistrement: Date
    utilisateurId: string
    emotionN2Id: string
    _count: JournalEmotionCountAggregateOutputType | null
    _min: JournalEmotionMinAggregateOutputType | null
    _max: JournalEmotionMaxAggregateOutputType | null
  }

  type GetJournalEmotionGroupByPayload<T extends JournalEmotionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JournalEmotionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JournalEmotionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JournalEmotionGroupByOutputType[P]>
            : GetScalarType<T[P], JournalEmotionGroupByOutputType[P]>
        }
      >
    >


  export type JournalEmotionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    notePersonnelle?: boolean
    dateEnregistrement?: boolean
    utilisateurId?: boolean
    emotionN2Id?: boolean
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
    emotionN2?: boolean | EmotionNiveau2DefaultArgs<ExtArgs>
  }, ExtArgs["result"]["journalEmotion"]>



  export type JournalEmotionSelectScalar = {
    id?: boolean
    notePersonnelle?: boolean
    dateEnregistrement?: boolean
    utilisateurId?: boolean
    emotionN2Id?: boolean
  }

  export type JournalEmotionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "notePersonnelle" | "dateEnregistrement" | "utilisateurId" | "emotionN2Id", ExtArgs["result"]["journalEmotion"]>
  export type JournalEmotionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
    emotionN2?: boolean | EmotionNiveau2DefaultArgs<ExtArgs>
  }

  export type $JournalEmotionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JournalEmotion"
    objects: {
      utilisateur: Prisma.$UserPayload<ExtArgs>
      emotionN2: Prisma.$EmotionNiveau2Payload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      notePersonnelle: string | null
      dateEnregistrement: Date
      utilisateurId: string
      emotionN2Id: string
    }, ExtArgs["result"]["journalEmotion"]>
    composites: {}
  }

  type JournalEmotionGetPayload<S extends boolean | null | undefined | JournalEmotionDefaultArgs> = $Result.GetResult<Prisma.$JournalEmotionPayload, S>

  type JournalEmotionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JournalEmotionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JournalEmotionCountAggregateInputType | true
    }

  export interface JournalEmotionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JournalEmotion'], meta: { name: 'JournalEmotion' } }
    /**
     * Find zero or one JournalEmotion that matches the filter.
     * @param {JournalEmotionFindUniqueArgs} args - Arguments to find a JournalEmotion
     * @example
     * // Get one JournalEmotion
     * const journalEmotion = await prisma.journalEmotion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JournalEmotionFindUniqueArgs>(args: SelectSubset<T, JournalEmotionFindUniqueArgs<ExtArgs>>): Prisma__JournalEmotionClient<$Result.GetResult<Prisma.$JournalEmotionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JournalEmotion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JournalEmotionFindUniqueOrThrowArgs} args - Arguments to find a JournalEmotion
     * @example
     * // Get one JournalEmotion
     * const journalEmotion = await prisma.journalEmotion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JournalEmotionFindUniqueOrThrowArgs>(args: SelectSubset<T, JournalEmotionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JournalEmotionClient<$Result.GetResult<Prisma.$JournalEmotionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JournalEmotion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalEmotionFindFirstArgs} args - Arguments to find a JournalEmotion
     * @example
     * // Get one JournalEmotion
     * const journalEmotion = await prisma.journalEmotion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JournalEmotionFindFirstArgs>(args?: SelectSubset<T, JournalEmotionFindFirstArgs<ExtArgs>>): Prisma__JournalEmotionClient<$Result.GetResult<Prisma.$JournalEmotionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JournalEmotion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalEmotionFindFirstOrThrowArgs} args - Arguments to find a JournalEmotion
     * @example
     * // Get one JournalEmotion
     * const journalEmotion = await prisma.journalEmotion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JournalEmotionFindFirstOrThrowArgs>(args?: SelectSubset<T, JournalEmotionFindFirstOrThrowArgs<ExtArgs>>): Prisma__JournalEmotionClient<$Result.GetResult<Prisma.$JournalEmotionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JournalEmotions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalEmotionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JournalEmotions
     * const journalEmotions = await prisma.journalEmotion.findMany()
     * 
     * // Get first 10 JournalEmotions
     * const journalEmotions = await prisma.journalEmotion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const journalEmotionWithIdOnly = await prisma.journalEmotion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JournalEmotionFindManyArgs>(args?: SelectSubset<T, JournalEmotionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JournalEmotionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JournalEmotion.
     * @param {JournalEmotionCreateArgs} args - Arguments to create a JournalEmotion.
     * @example
     * // Create one JournalEmotion
     * const JournalEmotion = await prisma.journalEmotion.create({
     *   data: {
     *     // ... data to create a JournalEmotion
     *   }
     * })
     * 
     */
    create<T extends JournalEmotionCreateArgs>(args: SelectSubset<T, JournalEmotionCreateArgs<ExtArgs>>): Prisma__JournalEmotionClient<$Result.GetResult<Prisma.$JournalEmotionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JournalEmotions.
     * @param {JournalEmotionCreateManyArgs} args - Arguments to create many JournalEmotions.
     * @example
     * // Create many JournalEmotions
     * const journalEmotion = await prisma.journalEmotion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JournalEmotionCreateManyArgs>(args?: SelectSubset<T, JournalEmotionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a JournalEmotion.
     * @param {JournalEmotionDeleteArgs} args - Arguments to delete one JournalEmotion.
     * @example
     * // Delete one JournalEmotion
     * const JournalEmotion = await prisma.journalEmotion.delete({
     *   where: {
     *     // ... filter to delete one JournalEmotion
     *   }
     * })
     * 
     */
    delete<T extends JournalEmotionDeleteArgs>(args: SelectSubset<T, JournalEmotionDeleteArgs<ExtArgs>>): Prisma__JournalEmotionClient<$Result.GetResult<Prisma.$JournalEmotionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JournalEmotion.
     * @param {JournalEmotionUpdateArgs} args - Arguments to update one JournalEmotion.
     * @example
     * // Update one JournalEmotion
     * const journalEmotion = await prisma.journalEmotion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JournalEmotionUpdateArgs>(args: SelectSubset<T, JournalEmotionUpdateArgs<ExtArgs>>): Prisma__JournalEmotionClient<$Result.GetResult<Prisma.$JournalEmotionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JournalEmotions.
     * @param {JournalEmotionDeleteManyArgs} args - Arguments to filter JournalEmotions to delete.
     * @example
     * // Delete a few JournalEmotions
     * const { count } = await prisma.journalEmotion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JournalEmotionDeleteManyArgs>(args?: SelectSubset<T, JournalEmotionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JournalEmotions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalEmotionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JournalEmotions
     * const journalEmotion = await prisma.journalEmotion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JournalEmotionUpdateManyArgs>(args: SelectSubset<T, JournalEmotionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one JournalEmotion.
     * @param {JournalEmotionUpsertArgs} args - Arguments to update or create a JournalEmotion.
     * @example
     * // Update or create a JournalEmotion
     * const journalEmotion = await prisma.journalEmotion.upsert({
     *   create: {
     *     // ... data to create a JournalEmotion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JournalEmotion we want to update
     *   }
     * })
     */
    upsert<T extends JournalEmotionUpsertArgs>(args: SelectSubset<T, JournalEmotionUpsertArgs<ExtArgs>>): Prisma__JournalEmotionClient<$Result.GetResult<Prisma.$JournalEmotionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JournalEmotions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalEmotionCountArgs} args - Arguments to filter JournalEmotions to count.
     * @example
     * // Count the number of JournalEmotions
     * const count = await prisma.journalEmotion.count({
     *   where: {
     *     // ... the filter for the JournalEmotions we want to count
     *   }
     * })
    **/
    count<T extends JournalEmotionCountArgs>(
      args?: Subset<T, JournalEmotionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JournalEmotionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JournalEmotion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalEmotionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JournalEmotionAggregateArgs>(args: Subset<T, JournalEmotionAggregateArgs>): Prisma.PrismaPromise<GetJournalEmotionAggregateType<T>>

    /**
     * Group by JournalEmotion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalEmotionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JournalEmotionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JournalEmotionGroupByArgs['orderBy'] }
        : { orderBy?: JournalEmotionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JournalEmotionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJournalEmotionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JournalEmotion model
   */
  readonly fields: JournalEmotionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JournalEmotion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JournalEmotionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    utilisateur<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    emotionN2<T extends EmotionNiveau2DefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmotionNiveau2DefaultArgs<ExtArgs>>): Prisma__EmotionNiveau2Client<$Result.GetResult<Prisma.$EmotionNiveau2Payload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JournalEmotion model
   */
  interface JournalEmotionFieldRefs {
    readonly id: FieldRef<"JournalEmotion", 'String'>
    readonly notePersonnelle: FieldRef<"JournalEmotion", 'String'>
    readonly dateEnregistrement: FieldRef<"JournalEmotion", 'DateTime'>
    readonly utilisateurId: FieldRef<"JournalEmotion", 'String'>
    readonly emotionN2Id: FieldRef<"JournalEmotion", 'String'>
  }
    

  // Custom InputTypes
  /**
   * JournalEmotion findUnique
   */
  export type JournalEmotionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEmotion
     */
    select?: JournalEmotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEmotion
     */
    omit?: JournalEmotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEmotionInclude<ExtArgs> | null
    /**
     * Filter, which JournalEmotion to fetch.
     */
    where: JournalEmotionWhereUniqueInput
  }

  /**
   * JournalEmotion findUniqueOrThrow
   */
  export type JournalEmotionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEmotion
     */
    select?: JournalEmotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEmotion
     */
    omit?: JournalEmotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEmotionInclude<ExtArgs> | null
    /**
     * Filter, which JournalEmotion to fetch.
     */
    where: JournalEmotionWhereUniqueInput
  }

  /**
   * JournalEmotion findFirst
   */
  export type JournalEmotionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEmotion
     */
    select?: JournalEmotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEmotion
     */
    omit?: JournalEmotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEmotionInclude<ExtArgs> | null
    /**
     * Filter, which JournalEmotion to fetch.
     */
    where?: JournalEmotionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JournalEmotions to fetch.
     */
    orderBy?: JournalEmotionOrderByWithRelationInput | JournalEmotionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JournalEmotions.
     */
    cursor?: JournalEmotionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JournalEmotions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JournalEmotions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JournalEmotions.
     */
    distinct?: JournalEmotionScalarFieldEnum | JournalEmotionScalarFieldEnum[]
  }

  /**
   * JournalEmotion findFirstOrThrow
   */
  export type JournalEmotionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEmotion
     */
    select?: JournalEmotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEmotion
     */
    omit?: JournalEmotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEmotionInclude<ExtArgs> | null
    /**
     * Filter, which JournalEmotion to fetch.
     */
    where?: JournalEmotionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JournalEmotions to fetch.
     */
    orderBy?: JournalEmotionOrderByWithRelationInput | JournalEmotionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JournalEmotions.
     */
    cursor?: JournalEmotionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JournalEmotions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JournalEmotions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JournalEmotions.
     */
    distinct?: JournalEmotionScalarFieldEnum | JournalEmotionScalarFieldEnum[]
  }

  /**
   * JournalEmotion findMany
   */
  export type JournalEmotionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEmotion
     */
    select?: JournalEmotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEmotion
     */
    omit?: JournalEmotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEmotionInclude<ExtArgs> | null
    /**
     * Filter, which JournalEmotions to fetch.
     */
    where?: JournalEmotionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JournalEmotions to fetch.
     */
    orderBy?: JournalEmotionOrderByWithRelationInput | JournalEmotionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JournalEmotions.
     */
    cursor?: JournalEmotionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JournalEmotions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JournalEmotions.
     */
    skip?: number
    distinct?: JournalEmotionScalarFieldEnum | JournalEmotionScalarFieldEnum[]
  }

  /**
   * JournalEmotion create
   */
  export type JournalEmotionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEmotion
     */
    select?: JournalEmotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEmotion
     */
    omit?: JournalEmotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEmotionInclude<ExtArgs> | null
    /**
     * The data needed to create a JournalEmotion.
     */
    data: XOR<JournalEmotionCreateInput, JournalEmotionUncheckedCreateInput>
  }

  /**
   * JournalEmotion createMany
   */
  export type JournalEmotionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JournalEmotions.
     */
    data: JournalEmotionCreateManyInput | JournalEmotionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JournalEmotion update
   */
  export type JournalEmotionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEmotion
     */
    select?: JournalEmotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEmotion
     */
    omit?: JournalEmotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEmotionInclude<ExtArgs> | null
    /**
     * The data needed to update a JournalEmotion.
     */
    data: XOR<JournalEmotionUpdateInput, JournalEmotionUncheckedUpdateInput>
    /**
     * Choose, which JournalEmotion to update.
     */
    where: JournalEmotionWhereUniqueInput
  }

  /**
   * JournalEmotion updateMany
   */
  export type JournalEmotionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JournalEmotions.
     */
    data: XOR<JournalEmotionUpdateManyMutationInput, JournalEmotionUncheckedUpdateManyInput>
    /**
     * Filter which JournalEmotions to update
     */
    where?: JournalEmotionWhereInput
    /**
     * Limit how many JournalEmotions to update.
     */
    limit?: number
  }

  /**
   * JournalEmotion upsert
   */
  export type JournalEmotionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEmotion
     */
    select?: JournalEmotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEmotion
     */
    omit?: JournalEmotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEmotionInclude<ExtArgs> | null
    /**
     * The filter to search for the JournalEmotion to update in case it exists.
     */
    where: JournalEmotionWhereUniqueInput
    /**
     * In case the JournalEmotion found by the `where` argument doesn't exist, create a new JournalEmotion with this data.
     */
    create: XOR<JournalEmotionCreateInput, JournalEmotionUncheckedCreateInput>
    /**
     * In case the JournalEmotion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JournalEmotionUpdateInput, JournalEmotionUncheckedUpdateInput>
  }

  /**
   * JournalEmotion delete
   */
  export type JournalEmotionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEmotion
     */
    select?: JournalEmotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEmotion
     */
    omit?: JournalEmotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEmotionInclude<ExtArgs> | null
    /**
     * Filter which JournalEmotion to delete.
     */
    where: JournalEmotionWhereUniqueInput
  }

  /**
   * JournalEmotion deleteMany
   */
  export type JournalEmotionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JournalEmotions to delete
     */
    where?: JournalEmotionWhereInput
    /**
     * Limit how many JournalEmotions to delete.
     */
    limit?: number
  }

  /**
   * JournalEmotion without action
   */
  export type JournalEmotionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEmotion
     */
    select?: JournalEmotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEmotion
     */
    omit?: JournalEmotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEmotionInclude<ExtArgs> | null
  }


  /**
   * Model SupportTicket
   */

  export type AggregateSupportTicket = {
    _count: SupportTicketCountAggregateOutputType | null
    _avg: SupportTicketAvgAggregateOutputType | null
    _sum: SupportTicketSumAggregateOutputType | null
    _min: SupportTicketMinAggregateOutputType | null
    _max: SupportTicketMaxAggregateOutputType | null
  }

  export type SupportTicketAvgAggregateOutputType = {
    glpiTicketId: number | null
    statusCode: number | null
  }

  export type SupportTicketSumAggregateOutputType = {
    glpiTicketId: number | null
    statusCode: number | null
  }

  export type SupportTicketMinAggregateOutputType = {
    id: string | null
    glpiTicketId: number | null
    category: $Enums.SupportCategory | null
    subject: string | null
    statusCode: number | null
    lastSyncedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    utilisateurId: string | null
  }

  export type SupportTicketMaxAggregateOutputType = {
    id: string | null
    glpiTicketId: number | null
    category: $Enums.SupportCategory | null
    subject: string | null
    statusCode: number | null
    lastSyncedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    utilisateurId: string | null
  }

  export type SupportTicketCountAggregateOutputType = {
    id: number
    glpiTicketId: number
    category: number
    subject: number
    statusCode: number
    lastSyncedAt: number
    createdAt: number
    updatedAt: number
    utilisateurId: number
    _all: number
  }


  export type SupportTicketAvgAggregateInputType = {
    glpiTicketId?: true
    statusCode?: true
  }

  export type SupportTicketSumAggregateInputType = {
    glpiTicketId?: true
    statusCode?: true
  }

  export type SupportTicketMinAggregateInputType = {
    id?: true
    glpiTicketId?: true
    category?: true
    subject?: true
    statusCode?: true
    lastSyncedAt?: true
    createdAt?: true
    updatedAt?: true
    utilisateurId?: true
  }

  export type SupportTicketMaxAggregateInputType = {
    id?: true
    glpiTicketId?: true
    category?: true
    subject?: true
    statusCode?: true
    lastSyncedAt?: true
    createdAt?: true
    updatedAt?: true
    utilisateurId?: true
  }

  export type SupportTicketCountAggregateInputType = {
    id?: true
    glpiTicketId?: true
    category?: true
    subject?: true
    statusCode?: true
    lastSyncedAt?: true
    createdAt?: true
    updatedAt?: true
    utilisateurId?: true
    _all?: true
  }

  export type SupportTicketAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupportTicket to aggregate.
     */
    where?: SupportTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportTickets to fetch.
     */
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SupportTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SupportTickets
    **/
    _count?: true | SupportTicketCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SupportTicketAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SupportTicketSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SupportTicketMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SupportTicketMaxAggregateInputType
  }

  export type GetSupportTicketAggregateType<T extends SupportTicketAggregateArgs> = {
        [P in keyof T & keyof AggregateSupportTicket]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupportTicket[P]>
      : GetScalarType<T[P], AggregateSupportTicket[P]>
  }




  export type SupportTicketGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupportTicketWhereInput
    orderBy?: SupportTicketOrderByWithAggregationInput | SupportTicketOrderByWithAggregationInput[]
    by: SupportTicketScalarFieldEnum[] | SupportTicketScalarFieldEnum
    having?: SupportTicketScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SupportTicketCountAggregateInputType | true
    _avg?: SupportTicketAvgAggregateInputType
    _sum?: SupportTicketSumAggregateInputType
    _min?: SupportTicketMinAggregateInputType
    _max?: SupportTicketMaxAggregateInputType
  }

  export type SupportTicketGroupByOutputType = {
    id: string
    glpiTicketId: number
    category: $Enums.SupportCategory
    subject: string
    statusCode: number
    lastSyncedAt: Date | null
    createdAt: Date
    updatedAt: Date
    utilisateurId: string
    _count: SupportTicketCountAggregateOutputType | null
    _avg: SupportTicketAvgAggregateOutputType | null
    _sum: SupportTicketSumAggregateOutputType | null
    _min: SupportTicketMinAggregateOutputType | null
    _max: SupportTicketMaxAggregateOutputType | null
  }

  type GetSupportTicketGroupByPayload<T extends SupportTicketGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SupportTicketGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SupportTicketGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SupportTicketGroupByOutputType[P]>
            : GetScalarType<T[P], SupportTicketGroupByOutputType[P]>
        }
      >
    >


  export type SupportTicketSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    glpiTicketId?: boolean
    category?: boolean
    subject?: boolean
    statusCode?: boolean
    lastSyncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    utilisateurId?: boolean
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supportTicket"]>



  export type SupportTicketSelectScalar = {
    id?: boolean
    glpiTicketId?: boolean
    category?: boolean
    subject?: boolean
    statusCode?: boolean
    lastSyncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    utilisateurId?: boolean
  }

  export type SupportTicketOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "glpiTicketId" | "category" | "subject" | "statusCode" | "lastSyncedAt" | "createdAt" | "updatedAt" | "utilisateurId", ExtArgs["result"]["supportTicket"]>
  export type SupportTicketInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    utilisateur?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SupportTicketPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SupportTicket"
    objects: {
      utilisateur: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      glpiTicketId: number
      category: $Enums.SupportCategory
      subject: string
      statusCode: number
      lastSyncedAt: Date | null
      createdAt: Date
      updatedAt: Date
      utilisateurId: string
    }, ExtArgs["result"]["supportTicket"]>
    composites: {}
  }

  type SupportTicketGetPayload<S extends boolean | null | undefined | SupportTicketDefaultArgs> = $Result.GetResult<Prisma.$SupportTicketPayload, S>

  type SupportTicketCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SupportTicketFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SupportTicketCountAggregateInputType | true
    }

  export interface SupportTicketDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SupportTicket'], meta: { name: 'SupportTicket' } }
    /**
     * Find zero or one SupportTicket that matches the filter.
     * @param {SupportTicketFindUniqueArgs} args - Arguments to find a SupportTicket
     * @example
     * // Get one SupportTicket
     * const supportTicket = await prisma.supportTicket.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SupportTicketFindUniqueArgs>(args: SelectSubset<T, SupportTicketFindUniqueArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SupportTicket that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SupportTicketFindUniqueOrThrowArgs} args - Arguments to find a SupportTicket
     * @example
     * // Get one SupportTicket
     * const supportTicket = await prisma.supportTicket.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SupportTicketFindUniqueOrThrowArgs>(args: SelectSubset<T, SupportTicketFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SupportTicket that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketFindFirstArgs} args - Arguments to find a SupportTicket
     * @example
     * // Get one SupportTicket
     * const supportTicket = await prisma.supportTicket.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SupportTicketFindFirstArgs>(args?: SelectSubset<T, SupportTicketFindFirstArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SupportTicket that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketFindFirstOrThrowArgs} args - Arguments to find a SupportTicket
     * @example
     * // Get one SupportTicket
     * const supportTicket = await prisma.supportTicket.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SupportTicketFindFirstOrThrowArgs>(args?: SelectSubset<T, SupportTicketFindFirstOrThrowArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SupportTickets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SupportTickets
     * const supportTickets = await prisma.supportTicket.findMany()
     * 
     * // Get first 10 SupportTickets
     * const supportTickets = await prisma.supportTicket.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const supportTicketWithIdOnly = await prisma.supportTicket.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SupportTicketFindManyArgs>(args?: SelectSubset<T, SupportTicketFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SupportTicket.
     * @param {SupportTicketCreateArgs} args - Arguments to create a SupportTicket.
     * @example
     * // Create one SupportTicket
     * const SupportTicket = await prisma.supportTicket.create({
     *   data: {
     *     // ... data to create a SupportTicket
     *   }
     * })
     * 
     */
    create<T extends SupportTicketCreateArgs>(args: SelectSubset<T, SupportTicketCreateArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SupportTickets.
     * @param {SupportTicketCreateManyArgs} args - Arguments to create many SupportTickets.
     * @example
     * // Create many SupportTickets
     * const supportTicket = await prisma.supportTicket.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SupportTicketCreateManyArgs>(args?: SelectSubset<T, SupportTicketCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SupportTicket.
     * @param {SupportTicketDeleteArgs} args - Arguments to delete one SupportTicket.
     * @example
     * // Delete one SupportTicket
     * const SupportTicket = await prisma.supportTicket.delete({
     *   where: {
     *     // ... filter to delete one SupportTicket
     *   }
     * })
     * 
     */
    delete<T extends SupportTicketDeleteArgs>(args: SelectSubset<T, SupportTicketDeleteArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SupportTicket.
     * @param {SupportTicketUpdateArgs} args - Arguments to update one SupportTicket.
     * @example
     * // Update one SupportTicket
     * const supportTicket = await prisma.supportTicket.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SupportTicketUpdateArgs>(args: SelectSubset<T, SupportTicketUpdateArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SupportTickets.
     * @param {SupportTicketDeleteManyArgs} args - Arguments to filter SupportTickets to delete.
     * @example
     * // Delete a few SupportTickets
     * const { count } = await prisma.supportTicket.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SupportTicketDeleteManyArgs>(args?: SelectSubset<T, SupportTicketDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SupportTickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SupportTickets
     * const supportTicket = await prisma.supportTicket.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SupportTicketUpdateManyArgs>(args: SelectSubset<T, SupportTicketUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SupportTicket.
     * @param {SupportTicketUpsertArgs} args - Arguments to update or create a SupportTicket.
     * @example
     * // Update or create a SupportTicket
     * const supportTicket = await prisma.supportTicket.upsert({
     *   create: {
     *     // ... data to create a SupportTicket
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SupportTicket we want to update
     *   }
     * })
     */
    upsert<T extends SupportTicketUpsertArgs>(args: SelectSubset<T, SupportTicketUpsertArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SupportTickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketCountArgs} args - Arguments to filter SupportTickets to count.
     * @example
     * // Count the number of SupportTickets
     * const count = await prisma.supportTicket.count({
     *   where: {
     *     // ... the filter for the SupportTickets we want to count
     *   }
     * })
    **/
    count<T extends SupportTicketCountArgs>(
      args?: Subset<T, SupportTicketCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SupportTicketCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SupportTicket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SupportTicketAggregateArgs>(args: Subset<T, SupportTicketAggregateArgs>): Prisma.PrismaPromise<GetSupportTicketAggregateType<T>>

    /**
     * Group by SupportTicket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SupportTicketGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SupportTicketGroupByArgs['orderBy'] }
        : { orderBy?: SupportTicketGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SupportTicketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupportTicketGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SupportTicket model
   */
  readonly fields: SupportTicketFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SupportTicket.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SupportTicketClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    utilisateur<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SupportTicket model
   */
  interface SupportTicketFieldRefs {
    readonly id: FieldRef<"SupportTicket", 'String'>
    readonly glpiTicketId: FieldRef<"SupportTicket", 'Int'>
    readonly category: FieldRef<"SupportTicket", 'SupportCategory'>
    readonly subject: FieldRef<"SupportTicket", 'String'>
    readonly statusCode: FieldRef<"SupportTicket", 'Int'>
    readonly lastSyncedAt: FieldRef<"SupportTicket", 'DateTime'>
    readonly createdAt: FieldRef<"SupportTicket", 'DateTime'>
    readonly updatedAt: FieldRef<"SupportTicket", 'DateTime'>
    readonly utilisateurId: FieldRef<"SupportTicket", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SupportTicket findUnique
   */
  export type SupportTicketFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter, which SupportTicket to fetch.
     */
    where: SupportTicketWhereUniqueInput
  }

  /**
   * SupportTicket findUniqueOrThrow
   */
  export type SupportTicketFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter, which SupportTicket to fetch.
     */
    where: SupportTicketWhereUniqueInput
  }

  /**
   * SupportTicket findFirst
   */
  export type SupportTicketFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter, which SupportTicket to fetch.
     */
    where?: SupportTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportTickets to fetch.
     */
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupportTickets.
     */
    cursor?: SupportTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportTickets.
     */
    distinct?: SupportTicketScalarFieldEnum | SupportTicketScalarFieldEnum[]
  }

  /**
   * SupportTicket findFirstOrThrow
   */
  export type SupportTicketFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter, which SupportTicket to fetch.
     */
    where?: SupportTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportTickets to fetch.
     */
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupportTickets.
     */
    cursor?: SupportTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportTickets.
     */
    distinct?: SupportTicketScalarFieldEnum | SupportTicketScalarFieldEnum[]
  }

  /**
   * SupportTicket findMany
   */
  export type SupportTicketFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter, which SupportTickets to fetch.
     */
    where?: SupportTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportTickets to fetch.
     */
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SupportTickets.
     */
    cursor?: SupportTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportTickets.
     */
    skip?: number
    distinct?: SupportTicketScalarFieldEnum | SupportTicketScalarFieldEnum[]
  }

  /**
   * SupportTicket create
   */
  export type SupportTicketCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * The data needed to create a SupportTicket.
     */
    data: XOR<SupportTicketCreateInput, SupportTicketUncheckedCreateInput>
  }

  /**
   * SupportTicket createMany
   */
  export type SupportTicketCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SupportTickets.
     */
    data: SupportTicketCreateManyInput | SupportTicketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SupportTicket update
   */
  export type SupportTicketUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * The data needed to update a SupportTicket.
     */
    data: XOR<SupportTicketUpdateInput, SupportTicketUncheckedUpdateInput>
    /**
     * Choose, which SupportTicket to update.
     */
    where: SupportTicketWhereUniqueInput
  }

  /**
   * SupportTicket updateMany
   */
  export type SupportTicketUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SupportTickets.
     */
    data: XOR<SupportTicketUpdateManyMutationInput, SupportTicketUncheckedUpdateManyInput>
    /**
     * Filter which SupportTickets to update
     */
    where?: SupportTicketWhereInput
    /**
     * Limit how many SupportTickets to update.
     */
    limit?: number
  }

  /**
   * SupportTicket upsert
   */
  export type SupportTicketUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * The filter to search for the SupportTicket to update in case it exists.
     */
    where: SupportTicketWhereUniqueInput
    /**
     * In case the SupportTicket found by the `where` argument doesn't exist, create a new SupportTicket with this data.
     */
    create: XOR<SupportTicketCreateInput, SupportTicketUncheckedCreateInput>
    /**
     * In case the SupportTicket was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SupportTicketUpdateInput, SupportTicketUncheckedUpdateInput>
  }

  /**
   * SupportTicket delete
   */
  export type SupportTicketDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter which SupportTicket to delete.
     */
    where: SupportTicketWhereUniqueInput
  }

  /**
   * SupportTicket deleteMany
   */
  export type SupportTicketDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupportTickets to delete
     */
    where?: SupportTicketWhereInput
    /**
     * Limit how many SupportTickets to delete.
     */
    limit?: number
  }

  /**
   * SupportTicket without action
   */
  export type SupportTicketDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
  }


  /**
   * Model ExerciceRespiration
   */

  export type AggregateExerciceRespiration = {
    _count: ExerciceRespirationCountAggregateOutputType | null
    _avg: ExerciceRespirationAvgAggregateOutputType | null
    _sum: ExerciceRespirationSumAggregateOutputType | null
    _min: ExerciceRespirationMinAggregateOutputType | null
    _max: ExerciceRespirationMaxAggregateOutputType | null
  }

  export type ExerciceRespirationAvgAggregateOutputType = {
    inspirationSec: number | null
    expirationSec: number | null
    retenueSec: number | null
  }

  export type ExerciceRespirationSumAggregateOutputType = {
    inspirationSec: number | null
    expirationSec: number | null
    retenueSec: number | null
  }

  export type ExerciceRespirationMinAggregateOutputType = {
    id: string | null
    titre: string | null
    inspirationSec: number | null
    expirationSec: number | null
    retenueSec: number | null
    isCustom: boolean | null
    createurId: string | null
  }

  export type ExerciceRespirationMaxAggregateOutputType = {
    id: string | null
    titre: string | null
    inspirationSec: number | null
    expirationSec: number | null
    retenueSec: number | null
    isCustom: boolean | null
    createurId: string | null
  }

  export type ExerciceRespirationCountAggregateOutputType = {
    id: number
    titre: number
    inspirationSec: number
    expirationSec: number
    retenueSec: number
    isCustom: number
    createurId: number
    _all: number
  }


  export type ExerciceRespirationAvgAggregateInputType = {
    inspirationSec?: true
    expirationSec?: true
    retenueSec?: true
  }

  export type ExerciceRespirationSumAggregateInputType = {
    inspirationSec?: true
    expirationSec?: true
    retenueSec?: true
  }

  export type ExerciceRespirationMinAggregateInputType = {
    id?: true
    titre?: true
    inspirationSec?: true
    expirationSec?: true
    retenueSec?: true
    isCustom?: true
    createurId?: true
  }

  export type ExerciceRespirationMaxAggregateInputType = {
    id?: true
    titre?: true
    inspirationSec?: true
    expirationSec?: true
    retenueSec?: true
    isCustom?: true
    createurId?: true
  }

  export type ExerciceRespirationCountAggregateInputType = {
    id?: true
    titre?: true
    inspirationSec?: true
    expirationSec?: true
    retenueSec?: true
    isCustom?: true
    createurId?: true
    _all?: true
  }

  export type ExerciceRespirationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExerciceRespiration to aggregate.
     */
    where?: ExerciceRespirationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExerciceRespirations to fetch.
     */
    orderBy?: ExerciceRespirationOrderByWithRelationInput | ExerciceRespirationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExerciceRespirationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExerciceRespirations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExerciceRespirations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExerciceRespirations
    **/
    _count?: true | ExerciceRespirationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExerciceRespirationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExerciceRespirationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExerciceRespirationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExerciceRespirationMaxAggregateInputType
  }

  export type GetExerciceRespirationAggregateType<T extends ExerciceRespirationAggregateArgs> = {
        [P in keyof T & keyof AggregateExerciceRespiration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExerciceRespiration[P]>
      : GetScalarType<T[P], AggregateExerciceRespiration[P]>
  }




  export type ExerciceRespirationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExerciceRespirationWhereInput
    orderBy?: ExerciceRespirationOrderByWithAggregationInput | ExerciceRespirationOrderByWithAggregationInput[]
    by: ExerciceRespirationScalarFieldEnum[] | ExerciceRespirationScalarFieldEnum
    having?: ExerciceRespirationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExerciceRespirationCountAggregateInputType | true
    _avg?: ExerciceRespirationAvgAggregateInputType
    _sum?: ExerciceRespirationSumAggregateInputType
    _min?: ExerciceRespirationMinAggregateInputType
    _max?: ExerciceRespirationMaxAggregateInputType
  }

  export type ExerciceRespirationGroupByOutputType = {
    id: string
    titre: string
    inspirationSec: number
    expirationSec: number
    retenueSec: number
    isCustom: boolean
    createurId: string | null
    _count: ExerciceRespirationCountAggregateOutputType | null
    _avg: ExerciceRespirationAvgAggregateOutputType | null
    _sum: ExerciceRespirationSumAggregateOutputType | null
    _min: ExerciceRespirationMinAggregateOutputType | null
    _max: ExerciceRespirationMaxAggregateOutputType | null
  }

  type GetExerciceRespirationGroupByPayload<T extends ExerciceRespirationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExerciceRespirationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExerciceRespirationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExerciceRespirationGroupByOutputType[P]>
            : GetScalarType<T[P], ExerciceRespirationGroupByOutputType[P]>
        }
      >
    >


  export type ExerciceRespirationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titre?: boolean
    inspirationSec?: boolean
    expirationSec?: boolean
    retenueSec?: boolean
    isCustom?: boolean
    createurId?: boolean
  }, ExtArgs["result"]["exerciceRespiration"]>



  export type ExerciceRespirationSelectScalar = {
    id?: boolean
    titre?: boolean
    inspirationSec?: boolean
    expirationSec?: boolean
    retenueSec?: boolean
    isCustom?: boolean
    createurId?: boolean
  }

  export type ExerciceRespirationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "titre" | "inspirationSec" | "expirationSec" | "retenueSec" | "isCustom" | "createurId", ExtArgs["result"]["exerciceRespiration"]>

  export type $ExerciceRespirationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExerciceRespiration"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      titre: string
      inspirationSec: number
      expirationSec: number
      retenueSec: number
      isCustom: boolean
      createurId: string | null
    }, ExtArgs["result"]["exerciceRespiration"]>
    composites: {}
  }

  type ExerciceRespirationGetPayload<S extends boolean | null | undefined | ExerciceRespirationDefaultArgs> = $Result.GetResult<Prisma.$ExerciceRespirationPayload, S>

  type ExerciceRespirationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExerciceRespirationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExerciceRespirationCountAggregateInputType | true
    }

  export interface ExerciceRespirationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExerciceRespiration'], meta: { name: 'ExerciceRespiration' } }
    /**
     * Find zero or one ExerciceRespiration that matches the filter.
     * @param {ExerciceRespirationFindUniqueArgs} args - Arguments to find a ExerciceRespiration
     * @example
     * // Get one ExerciceRespiration
     * const exerciceRespiration = await prisma.exerciceRespiration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExerciceRespirationFindUniqueArgs>(args: SelectSubset<T, ExerciceRespirationFindUniqueArgs<ExtArgs>>): Prisma__ExerciceRespirationClient<$Result.GetResult<Prisma.$ExerciceRespirationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExerciceRespiration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExerciceRespirationFindUniqueOrThrowArgs} args - Arguments to find a ExerciceRespiration
     * @example
     * // Get one ExerciceRespiration
     * const exerciceRespiration = await prisma.exerciceRespiration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExerciceRespirationFindUniqueOrThrowArgs>(args: SelectSubset<T, ExerciceRespirationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExerciceRespirationClient<$Result.GetResult<Prisma.$ExerciceRespirationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExerciceRespiration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciceRespirationFindFirstArgs} args - Arguments to find a ExerciceRespiration
     * @example
     * // Get one ExerciceRespiration
     * const exerciceRespiration = await prisma.exerciceRespiration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExerciceRespirationFindFirstArgs>(args?: SelectSubset<T, ExerciceRespirationFindFirstArgs<ExtArgs>>): Prisma__ExerciceRespirationClient<$Result.GetResult<Prisma.$ExerciceRespirationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExerciceRespiration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciceRespirationFindFirstOrThrowArgs} args - Arguments to find a ExerciceRespiration
     * @example
     * // Get one ExerciceRespiration
     * const exerciceRespiration = await prisma.exerciceRespiration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExerciceRespirationFindFirstOrThrowArgs>(args?: SelectSubset<T, ExerciceRespirationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExerciceRespirationClient<$Result.GetResult<Prisma.$ExerciceRespirationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExerciceRespirations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciceRespirationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExerciceRespirations
     * const exerciceRespirations = await prisma.exerciceRespiration.findMany()
     * 
     * // Get first 10 ExerciceRespirations
     * const exerciceRespirations = await prisma.exerciceRespiration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exerciceRespirationWithIdOnly = await prisma.exerciceRespiration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExerciceRespirationFindManyArgs>(args?: SelectSubset<T, ExerciceRespirationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExerciceRespirationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExerciceRespiration.
     * @param {ExerciceRespirationCreateArgs} args - Arguments to create a ExerciceRespiration.
     * @example
     * // Create one ExerciceRespiration
     * const ExerciceRespiration = await prisma.exerciceRespiration.create({
     *   data: {
     *     // ... data to create a ExerciceRespiration
     *   }
     * })
     * 
     */
    create<T extends ExerciceRespirationCreateArgs>(args: SelectSubset<T, ExerciceRespirationCreateArgs<ExtArgs>>): Prisma__ExerciceRespirationClient<$Result.GetResult<Prisma.$ExerciceRespirationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExerciceRespirations.
     * @param {ExerciceRespirationCreateManyArgs} args - Arguments to create many ExerciceRespirations.
     * @example
     * // Create many ExerciceRespirations
     * const exerciceRespiration = await prisma.exerciceRespiration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExerciceRespirationCreateManyArgs>(args?: SelectSubset<T, ExerciceRespirationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ExerciceRespiration.
     * @param {ExerciceRespirationDeleteArgs} args - Arguments to delete one ExerciceRespiration.
     * @example
     * // Delete one ExerciceRespiration
     * const ExerciceRespiration = await prisma.exerciceRespiration.delete({
     *   where: {
     *     // ... filter to delete one ExerciceRespiration
     *   }
     * })
     * 
     */
    delete<T extends ExerciceRespirationDeleteArgs>(args: SelectSubset<T, ExerciceRespirationDeleteArgs<ExtArgs>>): Prisma__ExerciceRespirationClient<$Result.GetResult<Prisma.$ExerciceRespirationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExerciceRespiration.
     * @param {ExerciceRespirationUpdateArgs} args - Arguments to update one ExerciceRespiration.
     * @example
     * // Update one ExerciceRespiration
     * const exerciceRespiration = await prisma.exerciceRespiration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExerciceRespirationUpdateArgs>(args: SelectSubset<T, ExerciceRespirationUpdateArgs<ExtArgs>>): Prisma__ExerciceRespirationClient<$Result.GetResult<Prisma.$ExerciceRespirationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExerciceRespirations.
     * @param {ExerciceRespirationDeleteManyArgs} args - Arguments to filter ExerciceRespirations to delete.
     * @example
     * // Delete a few ExerciceRespirations
     * const { count } = await prisma.exerciceRespiration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExerciceRespirationDeleteManyArgs>(args?: SelectSubset<T, ExerciceRespirationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExerciceRespirations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciceRespirationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExerciceRespirations
     * const exerciceRespiration = await prisma.exerciceRespiration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExerciceRespirationUpdateManyArgs>(args: SelectSubset<T, ExerciceRespirationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ExerciceRespiration.
     * @param {ExerciceRespirationUpsertArgs} args - Arguments to update or create a ExerciceRespiration.
     * @example
     * // Update or create a ExerciceRespiration
     * const exerciceRespiration = await prisma.exerciceRespiration.upsert({
     *   create: {
     *     // ... data to create a ExerciceRespiration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExerciceRespiration we want to update
     *   }
     * })
     */
    upsert<T extends ExerciceRespirationUpsertArgs>(args: SelectSubset<T, ExerciceRespirationUpsertArgs<ExtArgs>>): Prisma__ExerciceRespirationClient<$Result.GetResult<Prisma.$ExerciceRespirationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ExerciceRespirations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciceRespirationCountArgs} args - Arguments to filter ExerciceRespirations to count.
     * @example
     * // Count the number of ExerciceRespirations
     * const count = await prisma.exerciceRespiration.count({
     *   where: {
     *     // ... the filter for the ExerciceRespirations we want to count
     *   }
     * })
    **/
    count<T extends ExerciceRespirationCountArgs>(
      args?: Subset<T, ExerciceRespirationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExerciceRespirationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExerciceRespiration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciceRespirationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExerciceRespirationAggregateArgs>(args: Subset<T, ExerciceRespirationAggregateArgs>): Prisma.PrismaPromise<GetExerciceRespirationAggregateType<T>>

    /**
     * Group by ExerciceRespiration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciceRespirationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExerciceRespirationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExerciceRespirationGroupByArgs['orderBy'] }
        : { orderBy?: ExerciceRespirationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExerciceRespirationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExerciceRespirationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExerciceRespiration model
   */
  readonly fields: ExerciceRespirationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExerciceRespiration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExerciceRespirationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExerciceRespiration model
   */
  interface ExerciceRespirationFieldRefs {
    readonly id: FieldRef<"ExerciceRespiration", 'String'>
    readonly titre: FieldRef<"ExerciceRespiration", 'String'>
    readonly inspirationSec: FieldRef<"ExerciceRespiration", 'Int'>
    readonly expirationSec: FieldRef<"ExerciceRespiration", 'Int'>
    readonly retenueSec: FieldRef<"ExerciceRespiration", 'Int'>
    readonly isCustom: FieldRef<"ExerciceRespiration", 'Boolean'>
    readonly createurId: FieldRef<"ExerciceRespiration", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ExerciceRespiration findUnique
   */
  export type ExerciceRespirationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciceRespiration
     */
    select?: ExerciceRespirationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciceRespiration
     */
    omit?: ExerciceRespirationOmit<ExtArgs> | null
    /**
     * Filter, which ExerciceRespiration to fetch.
     */
    where: ExerciceRespirationWhereUniqueInput
  }

  /**
   * ExerciceRespiration findUniqueOrThrow
   */
  export type ExerciceRespirationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciceRespiration
     */
    select?: ExerciceRespirationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciceRespiration
     */
    omit?: ExerciceRespirationOmit<ExtArgs> | null
    /**
     * Filter, which ExerciceRespiration to fetch.
     */
    where: ExerciceRespirationWhereUniqueInput
  }

  /**
   * ExerciceRespiration findFirst
   */
  export type ExerciceRespirationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciceRespiration
     */
    select?: ExerciceRespirationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciceRespiration
     */
    omit?: ExerciceRespirationOmit<ExtArgs> | null
    /**
     * Filter, which ExerciceRespiration to fetch.
     */
    where?: ExerciceRespirationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExerciceRespirations to fetch.
     */
    orderBy?: ExerciceRespirationOrderByWithRelationInput | ExerciceRespirationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExerciceRespirations.
     */
    cursor?: ExerciceRespirationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExerciceRespirations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExerciceRespirations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExerciceRespirations.
     */
    distinct?: ExerciceRespirationScalarFieldEnum | ExerciceRespirationScalarFieldEnum[]
  }

  /**
   * ExerciceRespiration findFirstOrThrow
   */
  export type ExerciceRespirationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciceRespiration
     */
    select?: ExerciceRespirationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciceRespiration
     */
    omit?: ExerciceRespirationOmit<ExtArgs> | null
    /**
     * Filter, which ExerciceRespiration to fetch.
     */
    where?: ExerciceRespirationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExerciceRespirations to fetch.
     */
    orderBy?: ExerciceRespirationOrderByWithRelationInput | ExerciceRespirationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExerciceRespirations.
     */
    cursor?: ExerciceRespirationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExerciceRespirations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExerciceRespirations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExerciceRespirations.
     */
    distinct?: ExerciceRespirationScalarFieldEnum | ExerciceRespirationScalarFieldEnum[]
  }

  /**
   * ExerciceRespiration findMany
   */
  export type ExerciceRespirationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciceRespiration
     */
    select?: ExerciceRespirationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciceRespiration
     */
    omit?: ExerciceRespirationOmit<ExtArgs> | null
    /**
     * Filter, which ExerciceRespirations to fetch.
     */
    where?: ExerciceRespirationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExerciceRespirations to fetch.
     */
    orderBy?: ExerciceRespirationOrderByWithRelationInput | ExerciceRespirationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExerciceRespirations.
     */
    cursor?: ExerciceRespirationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExerciceRespirations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExerciceRespirations.
     */
    skip?: number
    distinct?: ExerciceRespirationScalarFieldEnum | ExerciceRespirationScalarFieldEnum[]
  }

  /**
   * ExerciceRespiration create
   */
  export type ExerciceRespirationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciceRespiration
     */
    select?: ExerciceRespirationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciceRespiration
     */
    omit?: ExerciceRespirationOmit<ExtArgs> | null
    /**
     * The data needed to create a ExerciceRespiration.
     */
    data: XOR<ExerciceRespirationCreateInput, ExerciceRespirationUncheckedCreateInput>
  }

  /**
   * ExerciceRespiration createMany
   */
  export type ExerciceRespirationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExerciceRespirations.
     */
    data: ExerciceRespirationCreateManyInput | ExerciceRespirationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExerciceRespiration update
   */
  export type ExerciceRespirationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciceRespiration
     */
    select?: ExerciceRespirationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciceRespiration
     */
    omit?: ExerciceRespirationOmit<ExtArgs> | null
    /**
     * The data needed to update a ExerciceRespiration.
     */
    data: XOR<ExerciceRespirationUpdateInput, ExerciceRespirationUncheckedUpdateInput>
    /**
     * Choose, which ExerciceRespiration to update.
     */
    where: ExerciceRespirationWhereUniqueInput
  }

  /**
   * ExerciceRespiration updateMany
   */
  export type ExerciceRespirationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExerciceRespirations.
     */
    data: XOR<ExerciceRespirationUpdateManyMutationInput, ExerciceRespirationUncheckedUpdateManyInput>
    /**
     * Filter which ExerciceRespirations to update
     */
    where?: ExerciceRespirationWhereInput
    /**
     * Limit how many ExerciceRespirations to update.
     */
    limit?: number
  }

  /**
   * ExerciceRespiration upsert
   */
  export type ExerciceRespirationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciceRespiration
     */
    select?: ExerciceRespirationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciceRespiration
     */
    omit?: ExerciceRespirationOmit<ExtArgs> | null
    /**
     * The filter to search for the ExerciceRespiration to update in case it exists.
     */
    where: ExerciceRespirationWhereUniqueInput
    /**
     * In case the ExerciceRespiration found by the `where` argument doesn't exist, create a new ExerciceRespiration with this data.
     */
    create: XOR<ExerciceRespirationCreateInput, ExerciceRespirationUncheckedCreateInput>
    /**
     * In case the ExerciceRespiration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExerciceRespirationUpdateInput, ExerciceRespirationUncheckedUpdateInput>
  }

  /**
   * ExerciceRespiration delete
   */
  export type ExerciceRespirationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciceRespiration
     */
    select?: ExerciceRespirationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciceRespiration
     */
    omit?: ExerciceRespirationOmit<ExtArgs> | null
    /**
     * Filter which ExerciceRespiration to delete.
     */
    where: ExerciceRespirationWhereUniqueInput
  }

  /**
   * ExerciceRespiration deleteMany
   */
  export type ExerciceRespirationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExerciceRespirations to delete
     */
    where?: ExerciceRespirationWhereInput
    /**
     * Limit how many ExerciceRespirations to delete.
     */
    limit?: number
  }

  /**
   * ExerciceRespiration without action
   */
  export type ExerciceRespirationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciceRespiration
     */
    select?: ExerciceRespirationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciceRespiration
     */
    omit?: ExerciceRespirationOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    firstName: 'firstName',
    lastName: 'lastName',
    age: 'age',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    role: 'role',
    isActif: 'isActif',
    dateConsentement: 'dateConsentement'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    expiresAt: 'expiresAt',
    token: 'token',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    userId: 'userId'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    providerId: 'providerId',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    idToken: 'idToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const VerificationScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum]


  export const PageInfoScalarFieldEnum: {
    id: 'id',
    titre: 'titre',
    slug: 'slug',
    contenu: 'contenu',
    dateCreation: 'dateCreation',
    dateMaj: 'dateMaj',
    isPublie: 'isPublie',
    auteurId: 'auteurId'
  };

  export type PageInfoScalarFieldEnum = (typeof PageInfoScalarFieldEnum)[keyof typeof PageInfoScalarFieldEnum]


  export const MenuScalarFieldEnum: {
    id: 'id',
    label: 'label',
    url: 'url',
    ordreAffichage: 'ordreAffichage'
  };

  export type MenuScalarFieldEnum = (typeof MenuScalarFieldEnum)[keyof typeof MenuScalarFieldEnum]


  export const EvenementStressScalarFieldEnum: {
    id: 'id',
    description: 'description',
    points: 'points',
    isActif: 'isActif'
  };

  export type EvenementStressScalarFieldEnum = (typeof EvenementStressScalarFieldEnum)[keyof typeof EvenementStressScalarFieldEnum]


  export const ResultatDiagnosticScalarFieldEnum: {
    id: 'id',
    dateEvaluation: 'dateEvaluation',
    scoreTotal: 'scoreTotal',
    niveauStress: 'niveauStress',
    utilisateurId: 'utilisateurId'
  };

  export type ResultatDiagnosticScalarFieldEnum = (typeof ResultatDiagnosticScalarFieldEnum)[keyof typeof ResultatDiagnosticScalarFieldEnum]


  export const ReponseDiagnosticScalarFieldEnum: {
    resultatId: 'resultatId',
    evenementId: 'evenementId'
  };

  export type ReponseDiagnosticScalarFieldEnum = (typeof ReponseDiagnosticScalarFieldEnum)[keyof typeof ReponseDiagnosticScalarFieldEnum]


  export const EmotionNiveau1ScalarFieldEnum: {
    id: 'id',
    libelle: 'libelle'
  };

  export type EmotionNiveau1ScalarFieldEnum = (typeof EmotionNiveau1ScalarFieldEnum)[keyof typeof EmotionNiveau1ScalarFieldEnum]


  export const EmotionNiveau2ScalarFieldEnum: {
    id: 'id',
    libelle: 'libelle',
    emotionN1Id: 'emotionN1Id'
  };

  export type EmotionNiveau2ScalarFieldEnum = (typeof EmotionNiveau2ScalarFieldEnum)[keyof typeof EmotionNiveau2ScalarFieldEnum]


  export const JournalEmotionScalarFieldEnum: {
    id: 'id',
    notePersonnelle: 'notePersonnelle',
    dateEnregistrement: 'dateEnregistrement',
    utilisateurId: 'utilisateurId',
    emotionN2Id: 'emotionN2Id'
  };

  export type JournalEmotionScalarFieldEnum = (typeof JournalEmotionScalarFieldEnum)[keyof typeof JournalEmotionScalarFieldEnum]


  export const SupportTicketScalarFieldEnum: {
    id: 'id',
    glpiTicketId: 'glpiTicketId',
    category: 'category',
    subject: 'subject',
    statusCode: 'statusCode',
    lastSyncedAt: 'lastSyncedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    utilisateurId: 'utilisateurId'
  };

  export type SupportTicketScalarFieldEnum = (typeof SupportTicketScalarFieldEnum)[keyof typeof SupportTicketScalarFieldEnum]


  export const ExerciceRespirationScalarFieldEnum: {
    id: 'id',
    titre: 'titre',
    inspirationSec: 'inspirationSec',
    expirationSec: 'expirationSec',
    retenueSec: 'retenueSec',
    isCustom: 'isCustom',
    createurId: 'createurId'
  };

  export type ExerciceRespirationScalarFieldEnum = (typeof ExerciceRespirationScalarFieldEnum)[keyof typeof ExerciceRespirationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const UserOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    image: 'image',
    firstName: 'firstName',
    lastName: 'lastName'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const SessionOrderByRelevanceFieldEnum: {
    id: 'id',
    token: 'token',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    userId: 'userId'
  };

  export type SessionOrderByRelevanceFieldEnum = (typeof SessionOrderByRelevanceFieldEnum)[keyof typeof SessionOrderByRelevanceFieldEnum]


  export const AccountOrderByRelevanceFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    providerId: 'providerId',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    idToken: 'idToken',
    scope: 'scope',
    password: 'password'
  };

  export type AccountOrderByRelevanceFieldEnum = (typeof AccountOrderByRelevanceFieldEnum)[keyof typeof AccountOrderByRelevanceFieldEnum]


  export const VerificationOrderByRelevanceFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value'
  };

  export type VerificationOrderByRelevanceFieldEnum = (typeof VerificationOrderByRelevanceFieldEnum)[keyof typeof VerificationOrderByRelevanceFieldEnum]


  export const PageInfoOrderByRelevanceFieldEnum: {
    id: 'id',
    titre: 'titre',
    slug: 'slug',
    contenu: 'contenu',
    auteurId: 'auteurId'
  };

  export type PageInfoOrderByRelevanceFieldEnum = (typeof PageInfoOrderByRelevanceFieldEnum)[keyof typeof PageInfoOrderByRelevanceFieldEnum]


  export const MenuOrderByRelevanceFieldEnum: {
    id: 'id',
    label: 'label',
    url: 'url'
  };

  export type MenuOrderByRelevanceFieldEnum = (typeof MenuOrderByRelevanceFieldEnum)[keyof typeof MenuOrderByRelevanceFieldEnum]


  export const EvenementStressOrderByRelevanceFieldEnum: {
    id: 'id',
    description: 'description'
  };

  export type EvenementStressOrderByRelevanceFieldEnum = (typeof EvenementStressOrderByRelevanceFieldEnum)[keyof typeof EvenementStressOrderByRelevanceFieldEnum]


  export const ResultatDiagnosticOrderByRelevanceFieldEnum: {
    id: 'id',
    niveauStress: 'niveauStress',
    utilisateurId: 'utilisateurId'
  };

  export type ResultatDiagnosticOrderByRelevanceFieldEnum = (typeof ResultatDiagnosticOrderByRelevanceFieldEnum)[keyof typeof ResultatDiagnosticOrderByRelevanceFieldEnum]


  export const ReponseDiagnosticOrderByRelevanceFieldEnum: {
    resultatId: 'resultatId',
    evenementId: 'evenementId'
  };

  export type ReponseDiagnosticOrderByRelevanceFieldEnum = (typeof ReponseDiagnosticOrderByRelevanceFieldEnum)[keyof typeof ReponseDiagnosticOrderByRelevanceFieldEnum]


  export const EmotionNiveau1OrderByRelevanceFieldEnum: {
    id: 'id',
    libelle: 'libelle'
  };

  export type EmotionNiveau1OrderByRelevanceFieldEnum = (typeof EmotionNiveau1OrderByRelevanceFieldEnum)[keyof typeof EmotionNiveau1OrderByRelevanceFieldEnum]


  export const EmotionNiveau2OrderByRelevanceFieldEnum: {
    id: 'id',
    libelle: 'libelle',
    emotionN1Id: 'emotionN1Id'
  };

  export type EmotionNiveau2OrderByRelevanceFieldEnum = (typeof EmotionNiveau2OrderByRelevanceFieldEnum)[keyof typeof EmotionNiveau2OrderByRelevanceFieldEnum]


  export const JournalEmotionOrderByRelevanceFieldEnum: {
    id: 'id',
    notePersonnelle: 'notePersonnelle',
    utilisateurId: 'utilisateurId',
    emotionN2Id: 'emotionN2Id'
  };

  export type JournalEmotionOrderByRelevanceFieldEnum = (typeof JournalEmotionOrderByRelevanceFieldEnum)[keyof typeof JournalEmotionOrderByRelevanceFieldEnum]


  export const SupportTicketOrderByRelevanceFieldEnum: {
    id: 'id',
    subject: 'subject',
    utilisateurId: 'utilisateurId'
  };

  export type SupportTicketOrderByRelevanceFieldEnum = (typeof SupportTicketOrderByRelevanceFieldEnum)[keyof typeof SupportTicketOrderByRelevanceFieldEnum]


  export const ExerciceRespirationOrderByRelevanceFieldEnum: {
    id: 'id',
    titre: 'titre',
    createurId: 'createurId'
  };

  export type ExerciceRespirationOrderByRelevanceFieldEnum = (typeof ExerciceRespirationOrderByRelevanceFieldEnum)[keyof typeof ExerciceRespirationOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'SupportCategory'
   */
  export type EnumSupportCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SupportCategory'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    age?: IntNullableFilter<"User"> | number | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isActif?: BoolFilter<"User"> | boolean
    dateConsentement?: DateTimeNullableFilter<"User"> | Date | string | null
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
    pagesRedigees?: PageInfoListRelationFilter
    resultatsDiagnostic?: ResultatDiagnosticListRelationFilter
    journalEmotions?: JournalEmotionListRelationFilter
    supportTickets?: SupportTicketListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    age?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    role?: SortOrder
    isActif?: SortOrder
    dateConsentement?: SortOrderInput | SortOrder
    sessions?: SessionOrderByRelationAggregateInput
    accounts?: AccountOrderByRelationAggregateInput
    pagesRedigees?: PageInfoOrderByRelationAggregateInput
    resultatsDiagnostic?: ResultatDiagnosticOrderByRelationAggregateInput
    journalEmotions?: JournalEmotionOrderByRelationAggregateInput
    supportTickets?: SupportTicketOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    age?: IntNullableFilter<"User"> | number | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isActif?: BoolFilter<"User"> | boolean
    dateConsentement?: DateTimeNullableFilter<"User"> | Date | string | null
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
    pagesRedigees?: PageInfoListRelationFilter
    resultatsDiagnostic?: ResultatDiagnosticListRelationFilter
    journalEmotions?: JournalEmotionListRelationFilter
    supportTickets?: SupportTicketListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    age?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    role?: SortOrder
    isActif?: SortOrder
    dateConsentement?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    age?: IntNullableWithAggregatesFilter<"User"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    isActif?: BoolWithAggregatesFilter<"User"> | boolean
    dateConsentement?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: SessionOrderByRelevanceInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    token?: StringWithAggregatesFilter<"Session"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userId?: StringWithAggregatesFilter<"Session"> | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: AccountOrderByRelevanceInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    accountId?: StringWithAggregatesFilter<"Account"> | string
    providerId?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    accessToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    idToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    password?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type VerificationWhereInput = {
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    id?: StringFilter<"Verification"> | string
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }

  export type VerificationOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: VerificationOrderByRelevanceInput
  }

  export type VerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }, "id">

  export type VerificationOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VerificationCountOrderByAggregateInput
    _max?: VerificationMaxOrderByAggregateInput
    _min?: VerificationMinOrderByAggregateInput
  }

  export type VerificationScalarWhereWithAggregatesInput = {
    AND?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    OR?: VerificationScalarWhereWithAggregatesInput[]
    NOT?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Verification"> | string
    identifier?: StringWithAggregatesFilter<"Verification"> | string
    value?: StringWithAggregatesFilter<"Verification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
  }

  export type PageInfoWhereInput = {
    AND?: PageInfoWhereInput | PageInfoWhereInput[]
    OR?: PageInfoWhereInput[]
    NOT?: PageInfoWhereInput | PageInfoWhereInput[]
    id?: StringFilter<"PageInfo"> | string
    titre?: StringFilter<"PageInfo"> | string
    slug?: StringFilter<"PageInfo"> | string
    contenu?: StringFilter<"PageInfo"> | string
    dateCreation?: DateTimeFilter<"PageInfo"> | Date | string
    dateMaj?: DateTimeFilter<"PageInfo"> | Date | string
    isPublie?: BoolFilter<"PageInfo"> | boolean
    auteurId?: StringFilter<"PageInfo"> | string
    auteur?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PageInfoOrderByWithRelationInput = {
    id?: SortOrder
    titre?: SortOrder
    slug?: SortOrder
    contenu?: SortOrder
    dateCreation?: SortOrder
    dateMaj?: SortOrder
    isPublie?: SortOrder
    auteurId?: SortOrder
    auteur?: UserOrderByWithRelationInput
    _relevance?: PageInfoOrderByRelevanceInput
  }

  export type PageInfoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: PageInfoWhereInput | PageInfoWhereInput[]
    OR?: PageInfoWhereInput[]
    NOT?: PageInfoWhereInput | PageInfoWhereInput[]
    titre?: StringFilter<"PageInfo"> | string
    contenu?: StringFilter<"PageInfo"> | string
    dateCreation?: DateTimeFilter<"PageInfo"> | Date | string
    dateMaj?: DateTimeFilter<"PageInfo"> | Date | string
    isPublie?: BoolFilter<"PageInfo"> | boolean
    auteurId?: StringFilter<"PageInfo"> | string
    auteur?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "slug">

  export type PageInfoOrderByWithAggregationInput = {
    id?: SortOrder
    titre?: SortOrder
    slug?: SortOrder
    contenu?: SortOrder
    dateCreation?: SortOrder
    dateMaj?: SortOrder
    isPublie?: SortOrder
    auteurId?: SortOrder
    _count?: PageInfoCountOrderByAggregateInput
    _max?: PageInfoMaxOrderByAggregateInput
    _min?: PageInfoMinOrderByAggregateInput
  }

  export type PageInfoScalarWhereWithAggregatesInput = {
    AND?: PageInfoScalarWhereWithAggregatesInput | PageInfoScalarWhereWithAggregatesInput[]
    OR?: PageInfoScalarWhereWithAggregatesInput[]
    NOT?: PageInfoScalarWhereWithAggregatesInput | PageInfoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PageInfo"> | string
    titre?: StringWithAggregatesFilter<"PageInfo"> | string
    slug?: StringWithAggregatesFilter<"PageInfo"> | string
    contenu?: StringWithAggregatesFilter<"PageInfo"> | string
    dateCreation?: DateTimeWithAggregatesFilter<"PageInfo"> | Date | string
    dateMaj?: DateTimeWithAggregatesFilter<"PageInfo"> | Date | string
    isPublie?: BoolWithAggregatesFilter<"PageInfo"> | boolean
    auteurId?: StringWithAggregatesFilter<"PageInfo"> | string
  }

  export type MenuWhereInput = {
    AND?: MenuWhereInput | MenuWhereInput[]
    OR?: MenuWhereInput[]
    NOT?: MenuWhereInput | MenuWhereInput[]
    id?: StringFilter<"Menu"> | string
    label?: StringFilter<"Menu"> | string
    url?: StringFilter<"Menu"> | string
    ordreAffichage?: IntFilter<"Menu"> | number
  }

  export type MenuOrderByWithRelationInput = {
    id?: SortOrder
    label?: SortOrder
    url?: SortOrder
    ordreAffichage?: SortOrder
    _relevance?: MenuOrderByRelevanceInput
  }

  export type MenuWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MenuWhereInput | MenuWhereInput[]
    OR?: MenuWhereInput[]
    NOT?: MenuWhereInput | MenuWhereInput[]
    label?: StringFilter<"Menu"> | string
    url?: StringFilter<"Menu"> | string
    ordreAffichage?: IntFilter<"Menu"> | number
  }, "id">

  export type MenuOrderByWithAggregationInput = {
    id?: SortOrder
    label?: SortOrder
    url?: SortOrder
    ordreAffichage?: SortOrder
    _count?: MenuCountOrderByAggregateInput
    _avg?: MenuAvgOrderByAggregateInput
    _max?: MenuMaxOrderByAggregateInput
    _min?: MenuMinOrderByAggregateInput
    _sum?: MenuSumOrderByAggregateInput
  }

  export type MenuScalarWhereWithAggregatesInput = {
    AND?: MenuScalarWhereWithAggregatesInput | MenuScalarWhereWithAggregatesInput[]
    OR?: MenuScalarWhereWithAggregatesInput[]
    NOT?: MenuScalarWhereWithAggregatesInput | MenuScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Menu"> | string
    label?: StringWithAggregatesFilter<"Menu"> | string
    url?: StringWithAggregatesFilter<"Menu"> | string
    ordreAffichage?: IntWithAggregatesFilter<"Menu"> | number
  }

  export type EvenementStressWhereInput = {
    AND?: EvenementStressWhereInput | EvenementStressWhereInput[]
    OR?: EvenementStressWhereInput[]
    NOT?: EvenementStressWhereInput | EvenementStressWhereInput[]
    id?: StringFilter<"EvenementStress"> | string
    description?: StringFilter<"EvenementStress"> | string
    points?: IntFilter<"EvenementStress"> | number
    isActif?: BoolFilter<"EvenementStress"> | boolean
    reponses?: ReponseDiagnosticListRelationFilter
  }

  export type EvenementStressOrderByWithRelationInput = {
    id?: SortOrder
    description?: SortOrder
    points?: SortOrder
    isActif?: SortOrder
    reponses?: ReponseDiagnosticOrderByRelationAggregateInput
    _relevance?: EvenementStressOrderByRelevanceInput
  }

  export type EvenementStressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EvenementStressWhereInput | EvenementStressWhereInput[]
    OR?: EvenementStressWhereInput[]
    NOT?: EvenementStressWhereInput | EvenementStressWhereInput[]
    description?: StringFilter<"EvenementStress"> | string
    points?: IntFilter<"EvenementStress"> | number
    isActif?: BoolFilter<"EvenementStress"> | boolean
    reponses?: ReponseDiagnosticListRelationFilter
  }, "id">

  export type EvenementStressOrderByWithAggregationInput = {
    id?: SortOrder
    description?: SortOrder
    points?: SortOrder
    isActif?: SortOrder
    _count?: EvenementStressCountOrderByAggregateInput
    _avg?: EvenementStressAvgOrderByAggregateInput
    _max?: EvenementStressMaxOrderByAggregateInput
    _min?: EvenementStressMinOrderByAggregateInput
    _sum?: EvenementStressSumOrderByAggregateInput
  }

  export type EvenementStressScalarWhereWithAggregatesInput = {
    AND?: EvenementStressScalarWhereWithAggregatesInput | EvenementStressScalarWhereWithAggregatesInput[]
    OR?: EvenementStressScalarWhereWithAggregatesInput[]
    NOT?: EvenementStressScalarWhereWithAggregatesInput | EvenementStressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EvenementStress"> | string
    description?: StringWithAggregatesFilter<"EvenementStress"> | string
    points?: IntWithAggregatesFilter<"EvenementStress"> | number
    isActif?: BoolWithAggregatesFilter<"EvenementStress"> | boolean
  }

  export type ResultatDiagnosticWhereInput = {
    AND?: ResultatDiagnosticWhereInput | ResultatDiagnosticWhereInput[]
    OR?: ResultatDiagnosticWhereInput[]
    NOT?: ResultatDiagnosticWhereInput | ResultatDiagnosticWhereInput[]
    id?: StringFilter<"ResultatDiagnostic"> | string
    dateEvaluation?: DateTimeFilter<"ResultatDiagnostic"> | Date | string
    scoreTotal?: IntFilter<"ResultatDiagnostic"> | number
    niveauStress?: StringFilter<"ResultatDiagnostic"> | string
    utilisateurId?: StringFilter<"ResultatDiagnostic"> | string
    utilisateur?: XOR<UserScalarRelationFilter, UserWhereInput>
    reponses?: ReponseDiagnosticListRelationFilter
  }

  export type ResultatDiagnosticOrderByWithRelationInput = {
    id?: SortOrder
    dateEvaluation?: SortOrder
    scoreTotal?: SortOrder
    niveauStress?: SortOrder
    utilisateurId?: SortOrder
    utilisateur?: UserOrderByWithRelationInput
    reponses?: ReponseDiagnosticOrderByRelationAggregateInput
    _relevance?: ResultatDiagnosticOrderByRelevanceInput
  }

  export type ResultatDiagnosticWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ResultatDiagnosticWhereInput | ResultatDiagnosticWhereInput[]
    OR?: ResultatDiagnosticWhereInput[]
    NOT?: ResultatDiagnosticWhereInput | ResultatDiagnosticWhereInput[]
    dateEvaluation?: DateTimeFilter<"ResultatDiagnostic"> | Date | string
    scoreTotal?: IntFilter<"ResultatDiagnostic"> | number
    niveauStress?: StringFilter<"ResultatDiagnostic"> | string
    utilisateurId?: StringFilter<"ResultatDiagnostic"> | string
    utilisateur?: XOR<UserScalarRelationFilter, UserWhereInput>
    reponses?: ReponseDiagnosticListRelationFilter
  }, "id">

  export type ResultatDiagnosticOrderByWithAggregationInput = {
    id?: SortOrder
    dateEvaluation?: SortOrder
    scoreTotal?: SortOrder
    niveauStress?: SortOrder
    utilisateurId?: SortOrder
    _count?: ResultatDiagnosticCountOrderByAggregateInput
    _avg?: ResultatDiagnosticAvgOrderByAggregateInput
    _max?: ResultatDiagnosticMaxOrderByAggregateInput
    _min?: ResultatDiagnosticMinOrderByAggregateInput
    _sum?: ResultatDiagnosticSumOrderByAggregateInput
  }

  export type ResultatDiagnosticScalarWhereWithAggregatesInput = {
    AND?: ResultatDiagnosticScalarWhereWithAggregatesInput | ResultatDiagnosticScalarWhereWithAggregatesInput[]
    OR?: ResultatDiagnosticScalarWhereWithAggregatesInput[]
    NOT?: ResultatDiagnosticScalarWhereWithAggregatesInput | ResultatDiagnosticScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ResultatDiagnostic"> | string
    dateEvaluation?: DateTimeWithAggregatesFilter<"ResultatDiagnostic"> | Date | string
    scoreTotal?: IntWithAggregatesFilter<"ResultatDiagnostic"> | number
    niveauStress?: StringWithAggregatesFilter<"ResultatDiagnostic"> | string
    utilisateurId?: StringWithAggregatesFilter<"ResultatDiagnostic"> | string
  }

  export type ReponseDiagnosticWhereInput = {
    AND?: ReponseDiagnosticWhereInput | ReponseDiagnosticWhereInput[]
    OR?: ReponseDiagnosticWhereInput[]
    NOT?: ReponseDiagnosticWhereInput | ReponseDiagnosticWhereInput[]
    resultatId?: StringFilter<"ReponseDiagnostic"> | string
    evenementId?: StringFilter<"ReponseDiagnostic"> | string
    resultat?: XOR<ResultatDiagnosticScalarRelationFilter, ResultatDiagnosticWhereInput>
    evenement?: XOR<EvenementStressScalarRelationFilter, EvenementStressWhereInput>
  }

  export type ReponseDiagnosticOrderByWithRelationInput = {
    resultatId?: SortOrder
    evenementId?: SortOrder
    resultat?: ResultatDiagnosticOrderByWithRelationInput
    evenement?: EvenementStressOrderByWithRelationInput
    _relevance?: ReponseDiagnosticOrderByRelevanceInput
  }

  export type ReponseDiagnosticWhereUniqueInput = Prisma.AtLeast<{
    resultatId_evenementId?: ReponseDiagnosticResultatIdEvenementIdCompoundUniqueInput
    AND?: ReponseDiagnosticWhereInput | ReponseDiagnosticWhereInput[]
    OR?: ReponseDiagnosticWhereInput[]
    NOT?: ReponseDiagnosticWhereInput | ReponseDiagnosticWhereInput[]
    resultatId?: StringFilter<"ReponseDiagnostic"> | string
    evenementId?: StringFilter<"ReponseDiagnostic"> | string
    resultat?: XOR<ResultatDiagnosticScalarRelationFilter, ResultatDiagnosticWhereInput>
    evenement?: XOR<EvenementStressScalarRelationFilter, EvenementStressWhereInput>
  }, "resultatId_evenementId">

  export type ReponseDiagnosticOrderByWithAggregationInput = {
    resultatId?: SortOrder
    evenementId?: SortOrder
    _count?: ReponseDiagnosticCountOrderByAggregateInput
    _max?: ReponseDiagnosticMaxOrderByAggregateInput
    _min?: ReponseDiagnosticMinOrderByAggregateInput
  }

  export type ReponseDiagnosticScalarWhereWithAggregatesInput = {
    AND?: ReponseDiagnosticScalarWhereWithAggregatesInput | ReponseDiagnosticScalarWhereWithAggregatesInput[]
    OR?: ReponseDiagnosticScalarWhereWithAggregatesInput[]
    NOT?: ReponseDiagnosticScalarWhereWithAggregatesInput | ReponseDiagnosticScalarWhereWithAggregatesInput[]
    resultatId?: StringWithAggregatesFilter<"ReponseDiagnostic"> | string
    evenementId?: StringWithAggregatesFilter<"ReponseDiagnostic"> | string
  }

  export type EmotionNiveau1WhereInput = {
    AND?: EmotionNiveau1WhereInput | EmotionNiveau1WhereInput[]
    OR?: EmotionNiveau1WhereInput[]
    NOT?: EmotionNiveau1WhereInput | EmotionNiveau1WhereInput[]
    id?: StringFilter<"EmotionNiveau1"> | string
    libelle?: StringFilter<"EmotionNiveau1"> | string
    emotionsN2?: EmotionNiveau2ListRelationFilter
  }

  export type EmotionNiveau1OrderByWithRelationInput = {
    id?: SortOrder
    libelle?: SortOrder
    emotionsN2?: EmotionNiveau2OrderByRelationAggregateInput
    _relevance?: EmotionNiveau1OrderByRelevanceInput
  }

  export type EmotionNiveau1WhereUniqueInput = Prisma.AtLeast<{
    id?: string
    libelle?: string
    AND?: EmotionNiveau1WhereInput | EmotionNiveau1WhereInput[]
    OR?: EmotionNiveau1WhereInput[]
    NOT?: EmotionNiveau1WhereInput | EmotionNiveau1WhereInput[]
    emotionsN2?: EmotionNiveau2ListRelationFilter
  }, "id" | "libelle">

  export type EmotionNiveau1OrderByWithAggregationInput = {
    id?: SortOrder
    libelle?: SortOrder
    _count?: EmotionNiveau1CountOrderByAggregateInput
    _max?: EmotionNiveau1MaxOrderByAggregateInput
    _min?: EmotionNiveau1MinOrderByAggregateInput
  }

  export type EmotionNiveau1ScalarWhereWithAggregatesInput = {
    AND?: EmotionNiveau1ScalarWhereWithAggregatesInput | EmotionNiveau1ScalarWhereWithAggregatesInput[]
    OR?: EmotionNiveau1ScalarWhereWithAggregatesInput[]
    NOT?: EmotionNiveau1ScalarWhereWithAggregatesInput | EmotionNiveau1ScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmotionNiveau1"> | string
    libelle?: StringWithAggregatesFilter<"EmotionNiveau1"> | string
  }

  export type EmotionNiveau2WhereInput = {
    AND?: EmotionNiveau2WhereInput | EmotionNiveau2WhereInput[]
    OR?: EmotionNiveau2WhereInput[]
    NOT?: EmotionNiveau2WhereInput | EmotionNiveau2WhereInput[]
    id?: StringFilter<"EmotionNiveau2"> | string
    libelle?: StringFilter<"EmotionNiveau2"> | string
    emotionN1Id?: StringFilter<"EmotionNiveau2"> | string
    emotionN1?: XOR<EmotionNiveau1ScalarRelationFilter, EmotionNiveau1WhereInput>
    journaux?: JournalEmotionListRelationFilter
  }

  export type EmotionNiveau2OrderByWithRelationInput = {
    id?: SortOrder
    libelle?: SortOrder
    emotionN1Id?: SortOrder
    emotionN1?: EmotionNiveau1OrderByWithRelationInput
    journaux?: JournalEmotionOrderByRelationAggregateInput
    _relevance?: EmotionNiveau2OrderByRelevanceInput
  }

  export type EmotionNiveau2WhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmotionNiveau2WhereInput | EmotionNiveau2WhereInput[]
    OR?: EmotionNiveau2WhereInput[]
    NOT?: EmotionNiveau2WhereInput | EmotionNiveau2WhereInput[]
    libelle?: StringFilter<"EmotionNiveau2"> | string
    emotionN1Id?: StringFilter<"EmotionNiveau2"> | string
    emotionN1?: XOR<EmotionNiveau1ScalarRelationFilter, EmotionNiveau1WhereInput>
    journaux?: JournalEmotionListRelationFilter
  }, "id">

  export type EmotionNiveau2OrderByWithAggregationInput = {
    id?: SortOrder
    libelle?: SortOrder
    emotionN1Id?: SortOrder
    _count?: EmotionNiveau2CountOrderByAggregateInput
    _max?: EmotionNiveau2MaxOrderByAggregateInput
    _min?: EmotionNiveau2MinOrderByAggregateInput
  }

  export type EmotionNiveau2ScalarWhereWithAggregatesInput = {
    AND?: EmotionNiveau2ScalarWhereWithAggregatesInput | EmotionNiveau2ScalarWhereWithAggregatesInput[]
    OR?: EmotionNiveau2ScalarWhereWithAggregatesInput[]
    NOT?: EmotionNiveau2ScalarWhereWithAggregatesInput | EmotionNiveau2ScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmotionNiveau2"> | string
    libelle?: StringWithAggregatesFilter<"EmotionNiveau2"> | string
    emotionN1Id?: StringWithAggregatesFilter<"EmotionNiveau2"> | string
  }

  export type JournalEmotionWhereInput = {
    AND?: JournalEmotionWhereInput | JournalEmotionWhereInput[]
    OR?: JournalEmotionWhereInput[]
    NOT?: JournalEmotionWhereInput | JournalEmotionWhereInput[]
    id?: StringFilter<"JournalEmotion"> | string
    notePersonnelle?: StringNullableFilter<"JournalEmotion"> | string | null
    dateEnregistrement?: DateTimeFilter<"JournalEmotion"> | Date | string
    utilisateurId?: StringFilter<"JournalEmotion"> | string
    emotionN2Id?: StringFilter<"JournalEmotion"> | string
    utilisateur?: XOR<UserScalarRelationFilter, UserWhereInput>
    emotionN2?: XOR<EmotionNiveau2ScalarRelationFilter, EmotionNiveau2WhereInput>
  }

  export type JournalEmotionOrderByWithRelationInput = {
    id?: SortOrder
    notePersonnelle?: SortOrderInput | SortOrder
    dateEnregistrement?: SortOrder
    utilisateurId?: SortOrder
    emotionN2Id?: SortOrder
    utilisateur?: UserOrderByWithRelationInput
    emotionN2?: EmotionNiveau2OrderByWithRelationInput
    _relevance?: JournalEmotionOrderByRelevanceInput
  }

  export type JournalEmotionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JournalEmotionWhereInput | JournalEmotionWhereInput[]
    OR?: JournalEmotionWhereInput[]
    NOT?: JournalEmotionWhereInput | JournalEmotionWhereInput[]
    notePersonnelle?: StringNullableFilter<"JournalEmotion"> | string | null
    dateEnregistrement?: DateTimeFilter<"JournalEmotion"> | Date | string
    utilisateurId?: StringFilter<"JournalEmotion"> | string
    emotionN2Id?: StringFilter<"JournalEmotion"> | string
    utilisateur?: XOR<UserScalarRelationFilter, UserWhereInput>
    emotionN2?: XOR<EmotionNiveau2ScalarRelationFilter, EmotionNiveau2WhereInput>
  }, "id">

  export type JournalEmotionOrderByWithAggregationInput = {
    id?: SortOrder
    notePersonnelle?: SortOrderInput | SortOrder
    dateEnregistrement?: SortOrder
    utilisateurId?: SortOrder
    emotionN2Id?: SortOrder
    _count?: JournalEmotionCountOrderByAggregateInput
    _max?: JournalEmotionMaxOrderByAggregateInput
    _min?: JournalEmotionMinOrderByAggregateInput
  }

  export type JournalEmotionScalarWhereWithAggregatesInput = {
    AND?: JournalEmotionScalarWhereWithAggregatesInput | JournalEmotionScalarWhereWithAggregatesInput[]
    OR?: JournalEmotionScalarWhereWithAggregatesInput[]
    NOT?: JournalEmotionScalarWhereWithAggregatesInput | JournalEmotionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JournalEmotion"> | string
    notePersonnelle?: StringNullableWithAggregatesFilter<"JournalEmotion"> | string | null
    dateEnregistrement?: DateTimeWithAggregatesFilter<"JournalEmotion"> | Date | string
    utilisateurId?: StringWithAggregatesFilter<"JournalEmotion"> | string
    emotionN2Id?: StringWithAggregatesFilter<"JournalEmotion"> | string
  }

  export type SupportTicketWhereInput = {
    AND?: SupportTicketWhereInput | SupportTicketWhereInput[]
    OR?: SupportTicketWhereInput[]
    NOT?: SupportTicketWhereInput | SupportTicketWhereInput[]
    id?: StringFilter<"SupportTicket"> | string
    glpiTicketId?: IntFilter<"SupportTicket"> | number
    category?: EnumSupportCategoryFilter<"SupportTicket"> | $Enums.SupportCategory
    subject?: StringFilter<"SupportTicket"> | string
    statusCode?: IntFilter<"SupportTicket"> | number
    lastSyncedAt?: DateTimeNullableFilter<"SupportTicket"> | Date | string | null
    createdAt?: DateTimeFilter<"SupportTicket"> | Date | string
    updatedAt?: DateTimeFilter<"SupportTicket"> | Date | string
    utilisateurId?: StringFilter<"SupportTicket"> | string
    utilisateur?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SupportTicketOrderByWithRelationInput = {
    id?: SortOrder
    glpiTicketId?: SortOrder
    category?: SortOrder
    subject?: SortOrder
    statusCode?: SortOrder
    lastSyncedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    utilisateurId?: SortOrder
    utilisateur?: UserOrderByWithRelationInput
    _relevance?: SupportTicketOrderByRelevanceInput
  }

  export type SupportTicketWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    glpiTicketId?: number
    AND?: SupportTicketWhereInput | SupportTicketWhereInput[]
    OR?: SupportTicketWhereInput[]
    NOT?: SupportTicketWhereInput | SupportTicketWhereInput[]
    category?: EnumSupportCategoryFilter<"SupportTicket"> | $Enums.SupportCategory
    subject?: StringFilter<"SupportTicket"> | string
    statusCode?: IntFilter<"SupportTicket"> | number
    lastSyncedAt?: DateTimeNullableFilter<"SupportTicket"> | Date | string | null
    createdAt?: DateTimeFilter<"SupportTicket"> | Date | string
    updatedAt?: DateTimeFilter<"SupportTicket"> | Date | string
    utilisateurId?: StringFilter<"SupportTicket"> | string
    utilisateur?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "glpiTicketId">

  export type SupportTicketOrderByWithAggregationInput = {
    id?: SortOrder
    glpiTicketId?: SortOrder
    category?: SortOrder
    subject?: SortOrder
    statusCode?: SortOrder
    lastSyncedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    utilisateurId?: SortOrder
    _count?: SupportTicketCountOrderByAggregateInput
    _avg?: SupportTicketAvgOrderByAggregateInput
    _max?: SupportTicketMaxOrderByAggregateInput
    _min?: SupportTicketMinOrderByAggregateInput
    _sum?: SupportTicketSumOrderByAggregateInput
  }

  export type SupportTicketScalarWhereWithAggregatesInput = {
    AND?: SupportTicketScalarWhereWithAggregatesInput | SupportTicketScalarWhereWithAggregatesInput[]
    OR?: SupportTicketScalarWhereWithAggregatesInput[]
    NOT?: SupportTicketScalarWhereWithAggregatesInput | SupportTicketScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SupportTicket"> | string
    glpiTicketId?: IntWithAggregatesFilter<"SupportTicket"> | number
    category?: EnumSupportCategoryWithAggregatesFilter<"SupportTicket"> | $Enums.SupportCategory
    subject?: StringWithAggregatesFilter<"SupportTicket"> | string
    statusCode?: IntWithAggregatesFilter<"SupportTicket"> | number
    lastSyncedAt?: DateTimeNullableWithAggregatesFilter<"SupportTicket"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SupportTicket"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SupportTicket"> | Date | string
    utilisateurId?: StringWithAggregatesFilter<"SupportTicket"> | string
  }

  export type ExerciceRespirationWhereInput = {
    AND?: ExerciceRespirationWhereInput | ExerciceRespirationWhereInput[]
    OR?: ExerciceRespirationWhereInput[]
    NOT?: ExerciceRespirationWhereInput | ExerciceRespirationWhereInput[]
    id?: StringFilter<"ExerciceRespiration"> | string
    titre?: StringFilter<"ExerciceRespiration"> | string
    inspirationSec?: IntFilter<"ExerciceRespiration"> | number
    expirationSec?: IntFilter<"ExerciceRespiration"> | number
    retenueSec?: IntFilter<"ExerciceRespiration"> | number
    isCustom?: BoolFilter<"ExerciceRespiration"> | boolean
    createurId?: StringNullableFilter<"ExerciceRespiration"> | string | null
  }

  export type ExerciceRespirationOrderByWithRelationInput = {
    id?: SortOrder
    titre?: SortOrder
    inspirationSec?: SortOrder
    expirationSec?: SortOrder
    retenueSec?: SortOrder
    isCustom?: SortOrder
    createurId?: SortOrderInput | SortOrder
    _relevance?: ExerciceRespirationOrderByRelevanceInput
  }

  export type ExerciceRespirationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExerciceRespirationWhereInput | ExerciceRespirationWhereInput[]
    OR?: ExerciceRespirationWhereInput[]
    NOT?: ExerciceRespirationWhereInput | ExerciceRespirationWhereInput[]
    titre?: StringFilter<"ExerciceRespiration"> | string
    inspirationSec?: IntFilter<"ExerciceRespiration"> | number
    expirationSec?: IntFilter<"ExerciceRespiration"> | number
    retenueSec?: IntFilter<"ExerciceRespiration"> | number
    isCustom?: BoolFilter<"ExerciceRespiration"> | boolean
    createurId?: StringNullableFilter<"ExerciceRespiration"> | string | null
  }, "id">

  export type ExerciceRespirationOrderByWithAggregationInput = {
    id?: SortOrder
    titre?: SortOrder
    inspirationSec?: SortOrder
    expirationSec?: SortOrder
    retenueSec?: SortOrder
    isCustom?: SortOrder
    createurId?: SortOrderInput | SortOrder
    _count?: ExerciceRespirationCountOrderByAggregateInput
    _avg?: ExerciceRespirationAvgOrderByAggregateInput
    _max?: ExerciceRespirationMaxOrderByAggregateInput
    _min?: ExerciceRespirationMinOrderByAggregateInput
    _sum?: ExerciceRespirationSumOrderByAggregateInput
  }

  export type ExerciceRespirationScalarWhereWithAggregatesInput = {
    AND?: ExerciceRespirationScalarWhereWithAggregatesInput | ExerciceRespirationScalarWhereWithAggregatesInput[]
    OR?: ExerciceRespirationScalarWhereWithAggregatesInput[]
    NOT?: ExerciceRespirationScalarWhereWithAggregatesInput | ExerciceRespirationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExerciceRespiration"> | string
    titre?: StringWithAggregatesFilter<"ExerciceRespiration"> | string
    inspirationSec?: IntWithAggregatesFilter<"ExerciceRespiration"> | number
    expirationSec?: IntWithAggregatesFilter<"ExerciceRespiration"> | number
    retenueSec?: IntWithAggregatesFilter<"ExerciceRespiration"> | number
    isCustom?: BoolWithAggregatesFilter<"ExerciceRespiration"> | boolean
    createurId?: StringNullableWithAggregatesFilter<"ExerciceRespiration"> | string | null
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    firstName: string
    lastName: string
    age?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.Role
    isActif?: boolean
    dateConsentement?: Date | string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    pagesRedigees?: PageInfoCreateNestedManyWithoutAuteurInput
    resultatsDiagnostic?: ResultatDiagnosticCreateNestedManyWithoutUtilisateurInput
    journalEmotions?: JournalEmotionCreateNestedManyWithoutUtilisateurInput
    supportTickets?: SupportTicketCreateNestedManyWithoutUtilisateurInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    firstName: string
    lastName: string
    age?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.Role
    isActif?: boolean
    dateConsentement?: Date | string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    pagesRedigees?: PageInfoUncheckedCreateNestedManyWithoutAuteurInput
    resultatsDiagnostic?: ResultatDiagnosticUncheckedCreateNestedManyWithoutUtilisateurInput
    journalEmotions?: JournalEmotionUncheckedCreateNestedManyWithoutUtilisateurInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutUtilisateurInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActif?: BoolFieldUpdateOperationsInput | boolean
    dateConsentement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    pagesRedigees?: PageInfoUpdateManyWithoutAuteurNestedInput
    resultatsDiagnostic?: ResultatDiagnosticUpdateManyWithoutUtilisateurNestedInput
    journalEmotions?: JournalEmotionUpdateManyWithoutUtilisateurNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutUtilisateurNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActif?: BoolFieldUpdateOperationsInput | boolean
    dateConsentement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    pagesRedigees?: PageInfoUncheckedUpdateManyWithoutAuteurNestedInput
    resultatsDiagnostic?: ResultatDiagnosticUncheckedUpdateManyWithoutUtilisateurNestedInput
    journalEmotions?: JournalEmotionUncheckedUpdateManyWithoutUtilisateurNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutUtilisateurNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    firstName: string
    lastName: string
    age?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.Role
    isActif?: boolean
    dateConsentement?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActif?: BoolFieldUpdateOperationsInput | boolean
    dateConsentement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActif?: BoolFieldUpdateOperationsInput | boolean
    dateConsentement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionCreateInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type SessionCreateManyInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AccountCreateInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id?: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateInput = {
    id?: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUncheckedCreateInput = {
    id?: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateManyInput = {
    id?: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageInfoCreateInput = {
    id?: string
    titre: string
    slug: string
    contenu: string
    dateCreation?: Date | string
    dateMaj?: Date | string
    isPublie?: boolean
    auteur: UserCreateNestedOneWithoutPagesRedigeesInput
  }

  export type PageInfoUncheckedCreateInput = {
    id?: string
    titre: string
    slug: string
    contenu: string
    dateCreation?: Date | string
    dateMaj?: Date | string
    isPublie?: boolean
    auteurId: string
  }

  export type PageInfoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateMaj?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublie?: BoolFieldUpdateOperationsInput | boolean
    auteur?: UserUpdateOneRequiredWithoutPagesRedigeesNestedInput
  }

  export type PageInfoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateMaj?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublie?: BoolFieldUpdateOperationsInput | boolean
    auteurId?: StringFieldUpdateOperationsInput | string
  }

  export type PageInfoCreateManyInput = {
    id?: string
    titre: string
    slug: string
    contenu: string
    dateCreation?: Date | string
    dateMaj?: Date | string
    isPublie?: boolean
    auteurId: string
  }

  export type PageInfoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateMaj?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublie?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PageInfoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateMaj?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublie?: BoolFieldUpdateOperationsInput | boolean
    auteurId?: StringFieldUpdateOperationsInput | string
  }

  export type MenuCreateInput = {
    id?: string
    label: string
    url: string
    ordreAffichage: number
  }

  export type MenuUncheckedCreateInput = {
    id?: string
    label: string
    url: string
    ordreAffichage: number
  }

  export type MenuUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    ordreAffichage?: IntFieldUpdateOperationsInput | number
  }

  export type MenuUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    ordreAffichage?: IntFieldUpdateOperationsInput | number
  }

  export type MenuCreateManyInput = {
    id?: string
    label: string
    url: string
    ordreAffichage: number
  }

  export type MenuUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    ordreAffichage?: IntFieldUpdateOperationsInput | number
  }

  export type MenuUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    ordreAffichage?: IntFieldUpdateOperationsInput | number
  }

  export type EvenementStressCreateInput = {
    id?: string
    description: string
    points: number
    isActif?: boolean
    reponses?: ReponseDiagnosticCreateNestedManyWithoutEvenementInput
  }

  export type EvenementStressUncheckedCreateInput = {
    id?: string
    description: string
    points: number
    isActif?: boolean
    reponses?: ReponseDiagnosticUncheckedCreateNestedManyWithoutEvenementInput
  }

  export type EvenementStressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    isActif?: BoolFieldUpdateOperationsInput | boolean
    reponses?: ReponseDiagnosticUpdateManyWithoutEvenementNestedInput
  }

  export type EvenementStressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    isActif?: BoolFieldUpdateOperationsInput | boolean
    reponses?: ReponseDiagnosticUncheckedUpdateManyWithoutEvenementNestedInput
  }

  export type EvenementStressCreateManyInput = {
    id?: string
    description: string
    points: number
    isActif?: boolean
  }

  export type EvenementStressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    isActif?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EvenementStressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    isActif?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ResultatDiagnosticCreateInput = {
    id?: string
    dateEvaluation?: Date | string
    scoreTotal: number
    niveauStress: string
    utilisateur: UserCreateNestedOneWithoutResultatsDiagnosticInput
    reponses?: ReponseDiagnosticCreateNestedManyWithoutResultatInput
  }

  export type ResultatDiagnosticUncheckedCreateInput = {
    id?: string
    dateEvaluation?: Date | string
    scoreTotal: number
    niveauStress: string
    utilisateurId: string
    reponses?: ReponseDiagnosticUncheckedCreateNestedManyWithoutResultatInput
  }

  export type ResultatDiagnosticUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateEvaluation?: DateTimeFieldUpdateOperationsInput | Date | string
    scoreTotal?: IntFieldUpdateOperationsInput | number
    niveauStress?: StringFieldUpdateOperationsInput | string
    utilisateur?: UserUpdateOneRequiredWithoutResultatsDiagnosticNestedInput
    reponses?: ReponseDiagnosticUpdateManyWithoutResultatNestedInput
  }

  export type ResultatDiagnosticUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateEvaluation?: DateTimeFieldUpdateOperationsInput | Date | string
    scoreTotal?: IntFieldUpdateOperationsInput | number
    niveauStress?: StringFieldUpdateOperationsInput | string
    utilisateurId?: StringFieldUpdateOperationsInput | string
    reponses?: ReponseDiagnosticUncheckedUpdateManyWithoutResultatNestedInput
  }

  export type ResultatDiagnosticCreateManyInput = {
    id?: string
    dateEvaluation?: Date | string
    scoreTotal: number
    niveauStress: string
    utilisateurId: string
  }

  export type ResultatDiagnosticUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateEvaluation?: DateTimeFieldUpdateOperationsInput | Date | string
    scoreTotal?: IntFieldUpdateOperationsInput | number
    niveauStress?: StringFieldUpdateOperationsInput | string
  }

  export type ResultatDiagnosticUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateEvaluation?: DateTimeFieldUpdateOperationsInput | Date | string
    scoreTotal?: IntFieldUpdateOperationsInput | number
    niveauStress?: StringFieldUpdateOperationsInput | string
    utilisateurId?: StringFieldUpdateOperationsInput | string
  }

  export type ReponseDiagnosticCreateInput = {
    resultat: ResultatDiagnosticCreateNestedOneWithoutReponsesInput
    evenement: EvenementStressCreateNestedOneWithoutReponsesInput
  }

  export type ReponseDiagnosticUncheckedCreateInput = {
    resultatId: string
    evenementId: string
  }

  export type ReponseDiagnosticUpdateInput = {
    resultat?: ResultatDiagnosticUpdateOneRequiredWithoutReponsesNestedInput
    evenement?: EvenementStressUpdateOneRequiredWithoutReponsesNestedInput
  }

  export type ReponseDiagnosticUncheckedUpdateInput = {
    resultatId?: StringFieldUpdateOperationsInput | string
    evenementId?: StringFieldUpdateOperationsInput | string
  }

  export type ReponseDiagnosticCreateManyInput = {
    resultatId: string
    evenementId: string
  }

  export type ReponseDiagnosticUpdateManyMutationInput = {

  }

  export type ReponseDiagnosticUncheckedUpdateManyInput = {
    resultatId?: StringFieldUpdateOperationsInput | string
    evenementId?: StringFieldUpdateOperationsInput | string
  }

  export type EmotionNiveau1CreateInput = {
    id?: string
    libelle: string
    emotionsN2?: EmotionNiveau2CreateNestedManyWithoutEmotionN1Input
  }

  export type EmotionNiveau1UncheckedCreateInput = {
    id?: string
    libelle: string
    emotionsN2?: EmotionNiveau2UncheckedCreateNestedManyWithoutEmotionN1Input
  }

  export type EmotionNiveau1UpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
    emotionsN2?: EmotionNiveau2UpdateManyWithoutEmotionN1NestedInput
  }

  export type EmotionNiveau1UncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
    emotionsN2?: EmotionNiveau2UncheckedUpdateManyWithoutEmotionN1NestedInput
  }

  export type EmotionNiveau1CreateManyInput = {
    id?: string
    libelle: string
  }

  export type EmotionNiveau1UpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
  }

  export type EmotionNiveau1UncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
  }

  export type EmotionNiveau2CreateInput = {
    id?: string
    libelle: string
    emotionN1: EmotionNiveau1CreateNestedOneWithoutEmotionsN2Input
    journaux?: JournalEmotionCreateNestedManyWithoutEmotionN2Input
  }

  export type EmotionNiveau2UncheckedCreateInput = {
    id?: string
    libelle: string
    emotionN1Id: string
    journaux?: JournalEmotionUncheckedCreateNestedManyWithoutEmotionN2Input
  }

  export type EmotionNiveau2UpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
    emotionN1?: EmotionNiveau1UpdateOneRequiredWithoutEmotionsN2NestedInput
    journaux?: JournalEmotionUpdateManyWithoutEmotionN2NestedInput
  }

  export type EmotionNiveau2UncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
    emotionN1Id?: StringFieldUpdateOperationsInput | string
    journaux?: JournalEmotionUncheckedUpdateManyWithoutEmotionN2NestedInput
  }

  export type EmotionNiveau2CreateManyInput = {
    id?: string
    libelle: string
    emotionN1Id: string
  }

  export type EmotionNiveau2UpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
  }

  export type EmotionNiveau2UncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
    emotionN1Id?: StringFieldUpdateOperationsInput | string
  }

  export type JournalEmotionCreateInput = {
    id?: string
    notePersonnelle?: string | null
    dateEnregistrement?: Date | string
    utilisateur: UserCreateNestedOneWithoutJournalEmotionsInput
    emotionN2: EmotionNiveau2CreateNestedOneWithoutJournauxInput
  }

  export type JournalEmotionUncheckedCreateInput = {
    id?: string
    notePersonnelle?: string | null
    dateEnregistrement?: Date | string
    utilisateurId: string
    emotionN2Id: string
  }

  export type JournalEmotionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    notePersonnelle?: NullableStringFieldUpdateOperationsInput | string | null
    dateEnregistrement?: DateTimeFieldUpdateOperationsInput | Date | string
    utilisateur?: UserUpdateOneRequiredWithoutJournalEmotionsNestedInput
    emotionN2?: EmotionNiveau2UpdateOneRequiredWithoutJournauxNestedInput
  }

  export type JournalEmotionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    notePersonnelle?: NullableStringFieldUpdateOperationsInput | string | null
    dateEnregistrement?: DateTimeFieldUpdateOperationsInput | Date | string
    utilisateurId?: StringFieldUpdateOperationsInput | string
    emotionN2Id?: StringFieldUpdateOperationsInput | string
  }

  export type JournalEmotionCreateManyInput = {
    id?: string
    notePersonnelle?: string | null
    dateEnregistrement?: Date | string
    utilisateurId: string
    emotionN2Id: string
  }

  export type JournalEmotionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    notePersonnelle?: NullableStringFieldUpdateOperationsInput | string | null
    dateEnregistrement?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JournalEmotionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    notePersonnelle?: NullableStringFieldUpdateOperationsInput | string | null
    dateEnregistrement?: DateTimeFieldUpdateOperationsInput | Date | string
    utilisateurId?: StringFieldUpdateOperationsInput | string
    emotionN2Id?: StringFieldUpdateOperationsInput | string
  }

  export type SupportTicketCreateInput = {
    id?: string
    glpiTicketId: number
    category: $Enums.SupportCategory
    subject: string
    statusCode?: number
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    utilisateur: UserCreateNestedOneWithoutSupportTicketsInput
  }

  export type SupportTicketUncheckedCreateInput = {
    id?: string
    glpiTicketId: number
    category: $Enums.SupportCategory
    subject: string
    statusCode?: number
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    utilisateurId: string
  }

  export type SupportTicketUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    glpiTicketId?: IntFieldUpdateOperationsInput | number
    category?: EnumSupportCategoryFieldUpdateOperationsInput | $Enums.SupportCategory
    subject?: StringFieldUpdateOperationsInput | string
    statusCode?: IntFieldUpdateOperationsInput | number
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    utilisateur?: UserUpdateOneRequiredWithoutSupportTicketsNestedInput
  }

  export type SupportTicketUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    glpiTicketId?: IntFieldUpdateOperationsInput | number
    category?: EnumSupportCategoryFieldUpdateOperationsInput | $Enums.SupportCategory
    subject?: StringFieldUpdateOperationsInput | string
    statusCode?: IntFieldUpdateOperationsInput | number
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    utilisateurId?: StringFieldUpdateOperationsInput | string
  }

  export type SupportTicketCreateManyInput = {
    id?: string
    glpiTicketId: number
    category: $Enums.SupportCategory
    subject: string
    statusCode?: number
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    utilisateurId: string
  }

  export type SupportTicketUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    glpiTicketId?: IntFieldUpdateOperationsInput | number
    category?: EnumSupportCategoryFieldUpdateOperationsInput | $Enums.SupportCategory
    subject?: StringFieldUpdateOperationsInput | string
    statusCode?: IntFieldUpdateOperationsInput | number
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportTicketUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    glpiTicketId?: IntFieldUpdateOperationsInput | number
    category?: EnumSupportCategoryFieldUpdateOperationsInput | $Enums.SupportCategory
    subject?: StringFieldUpdateOperationsInput | string
    statusCode?: IntFieldUpdateOperationsInput | number
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    utilisateurId?: StringFieldUpdateOperationsInput | string
  }

  export type ExerciceRespirationCreateInput = {
    id?: string
    titre: string
    inspirationSec: number
    expirationSec: number
    retenueSec: number
    isCustom?: boolean
    createurId?: string | null
  }

  export type ExerciceRespirationUncheckedCreateInput = {
    id?: string
    titre: string
    inspirationSec: number
    expirationSec: number
    retenueSec: number
    isCustom?: boolean
    createurId?: string | null
  }

  export type ExerciceRespirationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    inspirationSec?: IntFieldUpdateOperationsInput | number
    expirationSec?: IntFieldUpdateOperationsInput | number
    retenueSec?: IntFieldUpdateOperationsInput | number
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    createurId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExerciceRespirationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    inspirationSec?: IntFieldUpdateOperationsInput | number
    expirationSec?: IntFieldUpdateOperationsInput | number
    retenueSec?: IntFieldUpdateOperationsInput | number
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    createurId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExerciceRespirationCreateManyInput = {
    id?: string
    titre: string
    inspirationSec: number
    expirationSec: number
    retenueSec: number
    isCustom?: boolean
    createurId?: string | null
  }

  export type ExerciceRespirationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    inspirationSec?: IntFieldUpdateOperationsInput | number
    expirationSec?: IntFieldUpdateOperationsInput | number
    retenueSec?: IntFieldUpdateOperationsInput | number
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    createurId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExerciceRespirationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    inspirationSec?: IntFieldUpdateOperationsInput | number
    expirationSec?: IntFieldUpdateOperationsInput | number
    retenueSec?: IntFieldUpdateOperationsInput | number
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    createurId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type PageInfoListRelationFilter = {
    every?: PageInfoWhereInput
    some?: PageInfoWhereInput
    none?: PageInfoWhereInput
  }

  export type ResultatDiagnosticListRelationFilter = {
    every?: ResultatDiagnosticWhereInput
    some?: ResultatDiagnosticWhereInput
    none?: ResultatDiagnosticWhereInput
  }

  export type JournalEmotionListRelationFilter = {
    every?: JournalEmotionWhereInput
    some?: JournalEmotionWhereInput
    none?: JournalEmotionWhereInput
  }

  export type SupportTicketListRelationFilter = {
    every?: SupportTicketWhereInput
    some?: SupportTicketWhereInput
    none?: SupportTicketWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PageInfoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResultatDiagnosticOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JournalEmotionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SupportTicketOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    age?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    role?: SortOrder
    isActif?: SortOrder
    dateConsentement?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    age?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    age?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    role?: SortOrder
    isActif?: SortOrder
    dateConsentement?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    age?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    role?: SortOrder
    isActif?: SortOrder
    dateConsentement?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    age?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SessionOrderByRelevanceInput = {
    fields: SessionOrderByRelevanceFieldEnum | SessionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type AccountOrderByRelevanceInput = {
    fields: AccountOrderByRelevanceFieldEnum | AccountOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationOrderByRelevanceInput = {
    fields: VerificationOrderByRelevanceFieldEnum | VerificationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type VerificationCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PageInfoOrderByRelevanceInput = {
    fields: PageInfoOrderByRelevanceFieldEnum | PageInfoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PageInfoCountOrderByAggregateInput = {
    id?: SortOrder
    titre?: SortOrder
    slug?: SortOrder
    contenu?: SortOrder
    dateCreation?: SortOrder
    dateMaj?: SortOrder
    isPublie?: SortOrder
    auteurId?: SortOrder
  }

  export type PageInfoMaxOrderByAggregateInput = {
    id?: SortOrder
    titre?: SortOrder
    slug?: SortOrder
    contenu?: SortOrder
    dateCreation?: SortOrder
    dateMaj?: SortOrder
    isPublie?: SortOrder
    auteurId?: SortOrder
  }

  export type PageInfoMinOrderByAggregateInput = {
    id?: SortOrder
    titre?: SortOrder
    slug?: SortOrder
    contenu?: SortOrder
    dateCreation?: SortOrder
    dateMaj?: SortOrder
    isPublie?: SortOrder
    auteurId?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type MenuOrderByRelevanceInput = {
    fields: MenuOrderByRelevanceFieldEnum | MenuOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type MenuCountOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    url?: SortOrder
    ordreAffichage?: SortOrder
  }

  export type MenuAvgOrderByAggregateInput = {
    ordreAffichage?: SortOrder
  }

  export type MenuMaxOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    url?: SortOrder
    ordreAffichage?: SortOrder
  }

  export type MenuMinOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    url?: SortOrder
    ordreAffichage?: SortOrder
  }

  export type MenuSumOrderByAggregateInput = {
    ordreAffichage?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ReponseDiagnosticListRelationFilter = {
    every?: ReponseDiagnosticWhereInput
    some?: ReponseDiagnosticWhereInput
    none?: ReponseDiagnosticWhereInput
  }

  export type ReponseDiagnosticOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EvenementStressOrderByRelevanceInput = {
    fields: EvenementStressOrderByRelevanceFieldEnum | EvenementStressOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type EvenementStressCountOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    points?: SortOrder
    isActif?: SortOrder
  }

  export type EvenementStressAvgOrderByAggregateInput = {
    points?: SortOrder
  }

  export type EvenementStressMaxOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    points?: SortOrder
    isActif?: SortOrder
  }

  export type EvenementStressMinOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    points?: SortOrder
    isActif?: SortOrder
  }

  export type EvenementStressSumOrderByAggregateInput = {
    points?: SortOrder
  }

  export type ResultatDiagnosticOrderByRelevanceInput = {
    fields: ResultatDiagnosticOrderByRelevanceFieldEnum | ResultatDiagnosticOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ResultatDiagnosticCountOrderByAggregateInput = {
    id?: SortOrder
    dateEvaluation?: SortOrder
    scoreTotal?: SortOrder
    niveauStress?: SortOrder
    utilisateurId?: SortOrder
  }

  export type ResultatDiagnosticAvgOrderByAggregateInput = {
    scoreTotal?: SortOrder
  }

  export type ResultatDiagnosticMaxOrderByAggregateInput = {
    id?: SortOrder
    dateEvaluation?: SortOrder
    scoreTotal?: SortOrder
    niveauStress?: SortOrder
    utilisateurId?: SortOrder
  }

  export type ResultatDiagnosticMinOrderByAggregateInput = {
    id?: SortOrder
    dateEvaluation?: SortOrder
    scoreTotal?: SortOrder
    niveauStress?: SortOrder
    utilisateurId?: SortOrder
  }

  export type ResultatDiagnosticSumOrderByAggregateInput = {
    scoreTotal?: SortOrder
  }

  export type ResultatDiagnosticScalarRelationFilter = {
    is?: ResultatDiagnosticWhereInput
    isNot?: ResultatDiagnosticWhereInput
  }

  export type EvenementStressScalarRelationFilter = {
    is?: EvenementStressWhereInput
    isNot?: EvenementStressWhereInput
  }

  export type ReponseDiagnosticOrderByRelevanceInput = {
    fields: ReponseDiagnosticOrderByRelevanceFieldEnum | ReponseDiagnosticOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ReponseDiagnosticResultatIdEvenementIdCompoundUniqueInput = {
    resultatId: string
    evenementId: string
  }

  export type ReponseDiagnosticCountOrderByAggregateInput = {
    resultatId?: SortOrder
    evenementId?: SortOrder
  }

  export type ReponseDiagnosticMaxOrderByAggregateInput = {
    resultatId?: SortOrder
    evenementId?: SortOrder
  }

  export type ReponseDiagnosticMinOrderByAggregateInput = {
    resultatId?: SortOrder
    evenementId?: SortOrder
  }

  export type EmotionNiveau2ListRelationFilter = {
    every?: EmotionNiveau2WhereInput
    some?: EmotionNiveau2WhereInput
    none?: EmotionNiveau2WhereInput
  }

  export type EmotionNiveau2OrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmotionNiveau1OrderByRelevanceInput = {
    fields: EmotionNiveau1OrderByRelevanceFieldEnum | EmotionNiveau1OrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type EmotionNiveau1CountOrderByAggregateInput = {
    id?: SortOrder
    libelle?: SortOrder
  }

  export type EmotionNiveau1MaxOrderByAggregateInput = {
    id?: SortOrder
    libelle?: SortOrder
  }

  export type EmotionNiveau1MinOrderByAggregateInput = {
    id?: SortOrder
    libelle?: SortOrder
  }

  export type EmotionNiveau1ScalarRelationFilter = {
    is?: EmotionNiveau1WhereInput
    isNot?: EmotionNiveau1WhereInput
  }

  export type EmotionNiveau2OrderByRelevanceInput = {
    fields: EmotionNiveau2OrderByRelevanceFieldEnum | EmotionNiveau2OrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type EmotionNiveau2CountOrderByAggregateInput = {
    id?: SortOrder
    libelle?: SortOrder
    emotionN1Id?: SortOrder
  }

  export type EmotionNiveau2MaxOrderByAggregateInput = {
    id?: SortOrder
    libelle?: SortOrder
    emotionN1Id?: SortOrder
  }

  export type EmotionNiveau2MinOrderByAggregateInput = {
    id?: SortOrder
    libelle?: SortOrder
    emotionN1Id?: SortOrder
  }

  export type EmotionNiveau2ScalarRelationFilter = {
    is?: EmotionNiveau2WhereInput
    isNot?: EmotionNiveau2WhereInput
  }

  export type JournalEmotionOrderByRelevanceInput = {
    fields: JournalEmotionOrderByRelevanceFieldEnum | JournalEmotionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type JournalEmotionCountOrderByAggregateInput = {
    id?: SortOrder
    notePersonnelle?: SortOrder
    dateEnregistrement?: SortOrder
    utilisateurId?: SortOrder
    emotionN2Id?: SortOrder
  }

  export type JournalEmotionMaxOrderByAggregateInput = {
    id?: SortOrder
    notePersonnelle?: SortOrder
    dateEnregistrement?: SortOrder
    utilisateurId?: SortOrder
    emotionN2Id?: SortOrder
  }

  export type JournalEmotionMinOrderByAggregateInput = {
    id?: SortOrder
    notePersonnelle?: SortOrder
    dateEnregistrement?: SortOrder
    utilisateurId?: SortOrder
    emotionN2Id?: SortOrder
  }

  export type EnumSupportCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.SupportCategory | EnumSupportCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.SupportCategory[]
    notIn?: $Enums.SupportCategory[]
    not?: NestedEnumSupportCategoryFilter<$PrismaModel> | $Enums.SupportCategory
  }

  export type SupportTicketOrderByRelevanceInput = {
    fields: SupportTicketOrderByRelevanceFieldEnum | SupportTicketOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SupportTicketCountOrderByAggregateInput = {
    id?: SortOrder
    glpiTicketId?: SortOrder
    category?: SortOrder
    subject?: SortOrder
    statusCode?: SortOrder
    lastSyncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    utilisateurId?: SortOrder
  }

  export type SupportTicketAvgOrderByAggregateInput = {
    glpiTicketId?: SortOrder
    statusCode?: SortOrder
  }

  export type SupportTicketMaxOrderByAggregateInput = {
    id?: SortOrder
    glpiTicketId?: SortOrder
    category?: SortOrder
    subject?: SortOrder
    statusCode?: SortOrder
    lastSyncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    utilisateurId?: SortOrder
  }

  export type SupportTicketMinOrderByAggregateInput = {
    id?: SortOrder
    glpiTicketId?: SortOrder
    category?: SortOrder
    subject?: SortOrder
    statusCode?: SortOrder
    lastSyncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    utilisateurId?: SortOrder
  }

  export type SupportTicketSumOrderByAggregateInput = {
    glpiTicketId?: SortOrder
    statusCode?: SortOrder
  }

  export type EnumSupportCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SupportCategory | EnumSupportCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.SupportCategory[]
    notIn?: $Enums.SupportCategory[]
    not?: NestedEnumSupportCategoryWithAggregatesFilter<$PrismaModel> | $Enums.SupportCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSupportCategoryFilter<$PrismaModel>
    _max?: NestedEnumSupportCategoryFilter<$PrismaModel>
  }

  export type ExerciceRespirationOrderByRelevanceInput = {
    fields: ExerciceRespirationOrderByRelevanceFieldEnum | ExerciceRespirationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ExerciceRespirationCountOrderByAggregateInput = {
    id?: SortOrder
    titre?: SortOrder
    inspirationSec?: SortOrder
    expirationSec?: SortOrder
    retenueSec?: SortOrder
    isCustom?: SortOrder
    createurId?: SortOrder
  }

  export type ExerciceRespirationAvgOrderByAggregateInput = {
    inspirationSec?: SortOrder
    expirationSec?: SortOrder
    retenueSec?: SortOrder
  }

  export type ExerciceRespirationMaxOrderByAggregateInput = {
    id?: SortOrder
    titre?: SortOrder
    inspirationSec?: SortOrder
    expirationSec?: SortOrder
    retenueSec?: SortOrder
    isCustom?: SortOrder
    createurId?: SortOrder
  }

  export type ExerciceRespirationMinOrderByAggregateInput = {
    id?: SortOrder
    titre?: SortOrder
    inspirationSec?: SortOrder
    expirationSec?: SortOrder
    retenueSec?: SortOrder
    isCustom?: SortOrder
    createurId?: SortOrder
  }

  export type ExerciceRespirationSumOrderByAggregateInput = {
    inspirationSec?: SortOrder
    expirationSec?: SortOrder
    retenueSec?: SortOrder
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type PageInfoCreateNestedManyWithoutAuteurInput = {
    create?: XOR<PageInfoCreateWithoutAuteurInput, PageInfoUncheckedCreateWithoutAuteurInput> | PageInfoCreateWithoutAuteurInput[] | PageInfoUncheckedCreateWithoutAuteurInput[]
    connectOrCreate?: PageInfoCreateOrConnectWithoutAuteurInput | PageInfoCreateOrConnectWithoutAuteurInput[]
    createMany?: PageInfoCreateManyAuteurInputEnvelope
    connect?: PageInfoWhereUniqueInput | PageInfoWhereUniqueInput[]
  }

  export type ResultatDiagnosticCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<ResultatDiagnosticCreateWithoutUtilisateurInput, ResultatDiagnosticUncheckedCreateWithoutUtilisateurInput> | ResultatDiagnosticCreateWithoutUtilisateurInput[] | ResultatDiagnosticUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: ResultatDiagnosticCreateOrConnectWithoutUtilisateurInput | ResultatDiagnosticCreateOrConnectWithoutUtilisateurInput[]
    createMany?: ResultatDiagnosticCreateManyUtilisateurInputEnvelope
    connect?: ResultatDiagnosticWhereUniqueInput | ResultatDiagnosticWhereUniqueInput[]
  }

  export type JournalEmotionCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<JournalEmotionCreateWithoutUtilisateurInput, JournalEmotionUncheckedCreateWithoutUtilisateurInput> | JournalEmotionCreateWithoutUtilisateurInput[] | JournalEmotionUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: JournalEmotionCreateOrConnectWithoutUtilisateurInput | JournalEmotionCreateOrConnectWithoutUtilisateurInput[]
    createMany?: JournalEmotionCreateManyUtilisateurInputEnvelope
    connect?: JournalEmotionWhereUniqueInput | JournalEmotionWhereUniqueInput[]
  }

  export type SupportTicketCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<SupportTicketCreateWithoutUtilisateurInput, SupportTicketUncheckedCreateWithoutUtilisateurInput> | SupportTicketCreateWithoutUtilisateurInput[] | SupportTicketUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutUtilisateurInput | SupportTicketCreateOrConnectWithoutUtilisateurInput[]
    createMany?: SupportTicketCreateManyUtilisateurInputEnvelope
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type PageInfoUncheckedCreateNestedManyWithoutAuteurInput = {
    create?: XOR<PageInfoCreateWithoutAuteurInput, PageInfoUncheckedCreateWithoutAuteurInput> | PageInfoCreateWithoutAuteurInput[] | PageInfoUncheckedCreateWithoutAuteurInput[]
    connectOrCreate?: PageInfoCreateOrConnectWithoutAuteurInput | PageInfoCreateOrConnectWithoutAuteurInput[]
    createMany?: PageInfoCreateManyAuteurInputEnvelope
    connect?: PageInfoWhereUniqueInput | PageInfoWhereUniqueInput[]
  }

  export type ResultatDiagnosticUncheckedCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<ResultatDiagnosticCreateWithoutUtilisateurInput, ResultatDiagnosticUncheckedCreateWithoutUtilisateurInput> | ResultatDiagnosticCreateWithoutUtilisateurInput[] | ResultatDiagnosticUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: ResultatDiagnosticCreateOrConnectWithoutUtilisateurInput | ResultatDiagnosticCreateOrConnectWithoutUtilisateurInput[]
    createMany?: ResultatDiagnosticCreateManyUtilisateurInputEnvelope
    connect?: ResultatDiagnosticWhereUniqueInput | ResultatDiagnosticWhereUniqueInput[]
  }

  export type JournalEmotionUncheckedCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<JournalEmotionCreateWithoutUtilisateurInput, JournalEmotionUncheckedCreateWithoutUtilisateurInput> | JournalEmotionCreateWithoutUtilisateurInput[] | JournalEmotionUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: JournalEmotionCreateOrConnectWithoutUtilisateurInput | JournalEmotionCreateOrConnectWithoutUtilisateurInput[]
    createMany?: JournalEmotionCreateManyUtilisateurInputEnvelope
    connect?: JournalEmotionWhereUniqueInput | JournalEmotionWhereUniqueInput[]
  }

  export type SupportTicketUncheckedCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<SupportTicketCreateWithoutUtilisateurInput, SupportTicketUncheckedCreateWithoutUtilisateurInput> | SupportTicketCreateWithoutUtilisateurInput[] | SupportTicketUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutUtilisateurInput | SupportTicketCreateOrConnectWithoutUtilisateurInput[]
    createMany?: SupportTicketCreateManyUtilisateurInputEnvelope
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type PageInfoUpdateManyWithoutAuteurNestedInput = {
    create?: XOR<PageInfoCreateWithoutAuteurInput, PageInfoUncheckedCreateWithoutAuteurInput> | PageInfoCreateWithoutAuteurInput[] | PageInfoUncheckedCreateWithoutAuteurInput[]
    connectOrCreate?: PageInfoCreateOrConnectWithoutAuteurInput | PageInfoCreateOrConnectWithoutAuteurInput[]
    upsert?: PageInfoUpsertWithWhereUniqueWithoutAuteurInput | PageInfoUpsertWithWhereUniqueWithoutAuteurInput[]
    createMany?: PageInfoCreateManyAuteurInputEnvelope
    set?: PageInfoWhereUniqueInput | PageInfoWhereUniqueInput[]
    disconnect?: PageInfoWhereUniqueInput | PageInfoWhereUniqueInput[]
    delete?: PageInfoWhereUniqueInput | PageInfoWhereUniqueInput[]
    connect?: PageInfoWhereUniqueInput | PageInfoWhereUniqueInput[]
    update?: PageInfoUpdateWithWhereUniqueWithoutAuteurInput | PageInfoUpdateWithWhereUniqueWithoutAuteurInput[]
    updateMany?: PageInfoUpdateManyWithWhereWithoutAuteurInput | PageInfoUpdateManyWithWhereWithoutAuteurInput[]
    deleteMany?: PageInfoScalarWhereInput | PageInfoScalarWhereInput[]
  }

  export type ResultatDiagnosticUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<ResultatDiagnosticCreateWithoutUtilisateurInput, ResultatDiagnosticUncheckedCreateWithoutUtilisateurInput> | ResultatDiagnosticCreateWithoutUtilisateurInput[] | ResultatDiagnosticUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: ResultatDiagnosticCreateOrConnectWithoutUtilisateurInput | ResultatDiagnosticCreateOrConnectWithoutUtilisateurInput[]
    upsert?: ResultatDiagnosticUpsertWithWhereUniqueWithoutUtilisateurInput | ResultatDiagnosticUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: ResultatDiagnosticCreateManyUtilisateurInputEnvelope
    set?: ResultatDiagnosticWhereUniqueInput | ResultatDiagnosticWhereUniqueInput[]
    disconnect?: ResultatDiagnosticWhereUniqueInput | ResultatDiagnosticWhereUniqueInput[]
    delete?: ResultatDiagnosticWhereUniqueInput | ResultatDiagnosticWhereUniqueInput[]
    connect?: ResultatDiagnosticWhereUniqueInput | ResultatDiagnosticWhereUniqueInput[]
    update?: ResultatDiagnosticUpdateWithWhereUniqueWithoutUtilisateurInput | ResultatDiagnosticUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: ResultatDiagnosticUpdateManyWithWhereWithoutUtilisateurInput | ResultatDiagnosticUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: ResultatDiagnosticScalarWhereInput | ResultatDiagnosticScalarWhereInput[]
  }

  export type JournalEmotionUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<JournalEmotionCreateWithoutUtilisateurInput, JournalEmotionUncheckedCreateWithoutUtilisateurInput> | JournalEmotionCreateWithoutUtilisateurInput[] | JournalEmotionUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: JournalEmotionCreateOrConnectWithoutUtilisateurInput | JournalEmotionCreateOrConnectWithoutUtilisateurInput[]
    upsert?: JournalEmotionUpsertWithWhereUniqueWithoutUtilisateurInput | JournalEmotionUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: JournalEmotionCreateManyUtilisateurInputEnvelope
    set?: JournalEmotionWhereUniqueInput | JournalEmotionWhereUniqueInput[]
    disconnect?: JournalEmotionWhereUniqueInput | JournalEmotionWhereUniqueInput[]
    delete?: JournalEmotionWhereUniqueInput | JournalEmotionWhereUniqueInput[]
    connect?: JournalEmotionWhereUniqueInput | JournalEmotionWhereUniqueInput[]
    update?: JournalEmotionUpdateWithWhereUniqueWithoutUtilisateurInput | JournalEmotionUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: JournalEmotionUpdateManyWithWhereWithoutUtilisateurInput | JournalEmotionUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: JournalEmotionScalarWhereInput | JournalEmotionScalarWhereInput[]
  }

  export type SupportTicketUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<SupportTicketCreateWithoutUtilisateurInput, SupportTicketUncheckedCreateWithoutUtilisateurInput> | SupportTicketCreateWithoutUtilisateurInput[] | SupportTicketUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutUtilisateurInput | SupportTicketCreateOrConnectWithoutUtilisateurInput[]
    upsert?: SupportTicketUpsertWithWhereUniqueWithoutUtilisateurInput | SupportTicketUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: SupportTicketCreateManyUtilisateurInputEnvelope
    set?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    disconnect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    delete?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    update?: SupportTicketUpdateWithWhereUniqueWithoutUtilisateurInput | SupportTicketUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: SupportTicketUpdateManyWithWhereWithoutUtilisateurInput | SupportTicketUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: SupportTicketScalarWhereInput | SupportTicketScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type PageInfoUncheckedUpdateManyWithoutAuteurNestedInput = {
    create?: XOR<PageInfoCreateWithoutAuteurInput, PageInfoUncheckedCreateWithoutAuteurInput> | PageInfoCreateWithoutAuteurInput[] | PageInfoUncheckedCreateWithoutAuteurInput[]
    connectOrCreate?: PageInfoCreateOrConnectWithoutAuteurInput | PageInfoCreateOrConnectWithoutAuteurInput[]
    upsert?: PageInfoUpsertWithWhereUniqueWithoutAuteurInput | PageInfoUpsertWithWhereUniqueWithoutAuteurInput[]
    createMany?: PageInfoCreateManyAuteurInputEnvelope
    set?: PageInfoWhereUniqueInput | PageInfoWhereUniqueInput[]
    disconnect?: PageInfoWhereUniqueInput | PageInfoWhereUniqueInput[]
    delete?: PageInfoWhereUniqueInput | PageInfoWhereUniqueInput[]
    connect?: PageInfoWhereUniqueInput | PageInfoWhereUniqueInput[]
    update?: PageInfoUpdateWithWhereUniqueWithoutAuteurInput | PageInfoUpdateWithWhereUniqueWithoutAuteurInput[]
    updateMany?: PageInfoUpdateManyWithWhereWithoutAuteurInput | PageInfoUpdateManyWithWhereWithoutAuteurInput[]
    deleteMany?: PageInfoScalarWhereInput | PageInfoScalarWhereInput[]
  }

  export type ResultatDiagnosticUncheckedUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<ResultatDiagnosticCreateWithoutUtilisateurInput, ResultatDiagnosticUncheckedCreateWithoutUtilisateurInput> | ResultatDiagnosticCreateWithoutUtilisateurInput[] | ResultatDiagnosticUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: ResultatDiagnosticCreateOrConnectWithoutUtilisateurInput | ResultatDiagnosticCreateOrConnectWithoutUtilisateurInput[]
    upsert?: ResultatDiagnosticUpsertWithWhereUniqueWithoutUtilisateurInput | ResultatDiagnosticUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: ResultatDiagnosticCreateManyUtilisateurInputEnvelope
    set?: ResultatDiagnosticWhereUniqueInput | ResultatDiagnosticWhereUniqueInput[]
    disconnect?: ResultatDiagnosticWhereUniqueInput | ResultatDiagnosticWhereUniqueInput[]
    delete?: ResultatDiagnosticWhereUniqueInput | ResultatDiagnosticWhereUniqueInput[]
    connect?: ResultatDiagnosticWhereUniqueInput | ResultatDiagnosticWhereUniqueInput[]
    update?: ResultatDiagnosticUpdateWithWhereUniqueWithoutUtilisateurInput | ResultatDiagnosticUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: ResultatDiagnosticUpdateManyWithWhereWithoutUtilisateurInput | ResultatDiagnosticUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: ResultatDiagnosticScalarWhereInput | ResultatDiagnosticScalarWhereInput[]
  }

  export type JournalEmotionUncheckedUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<JournalEmotionCreateWithoutUtilisateurInput, JournalEmotionUncheckedCreateWithoutUtilisateurInput> | JournalEmotionCreateWithoutUtilisateurInput[] | JournalEmotionUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: JournalEmotionCreateOrConnectWithoutUtilisateurInput | JournalEmotionCreateOrConnectWithoutUtilisateurInput[]
    upsert?: JournalEmotionUpsertWithWhereUniqueWithoutUtilisateurInput | JournalEmotionUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: JournalEmotionCreateManyUtilisateurInputEnvelope
    set?: JournalEmotionWhereUniqueInput | JournalEmotionWhereUniqueInput[]
    disconnect?: JournalEmotionWhereUniqueInput | JournalEmotionWhereUniqueInput[]
    delete?: JournalEmotionWhereUniqueInput | JournalEmotionWhereUniqueInput[]
    connect?: JournalEmotionWhereUniqueInput | JournalEmotionWhereUniqueInput[]
    update?: JournalEmotionUpdateWithWhereUniqueWithoutUtilisateurInput | JournalEmotionUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: JournalEmotionUpdateManyWithWhereWithoutUtilisateurInput | JournalEmotionUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: JournalEmotionScalarWhereInput | JournalEmotionScalarWhereInput[]
  }

  export type SupportTicketUncheckedUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<SupportTicketCreateWithoutUtilisateurInput, SupportTicketUncheckedCreateWithoutUtilisateurInput> | SupportTicketCreateWithoutUtilisateurInput[] | SupportTicketUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutUtilisateurInput | SupportTicketCreateOrConnectWithoutUtilisateurInput[]
    upsert?: SupportTicketUpsertWithWhereUniqueWithoutUtilisateurInput | SupportTicketUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: SupportTicketCreateManyUtilisateurInputEnvelope
    set?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    disconnect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    delete?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    update?: SupportTicketUpdateWithWhereUniqueWithoutUtilisateurInput | SupportTicketUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: SupportTicketUpdateManyWithWhereWithoutUtilisateurInput | SupportTicketUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: SupportTicketScalarWhereInput | SupportTicketScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutPagesRedigeesInput = {
    create?: XOR<UserCreateWithoutPagesRedigeesInput, UserUncheckedCreateWithoutPagesRedigeesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPagesRedigeesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPagesRedigeesNestedInput = {
    create?: XOR<UserCreateWithoutPagesRedigeesInput, UserUncheckedCreateWithoutPagesRedigeesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPagesRedigeesInput
    upsert?: UserUpsertWithoutPagesRedigeesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPagesRedigeesInput, UserUpdateWithoutPagesRedigeesInput>, UserUncheckedUpdateWithoutPagesRedigeesInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ReponseDiagnosticCreateNestedManyWithoutEvenementInput = {
    create?: XOR<ReponseDiagnosticCreateWithoutEvenementInput, ReponseDiagnosticUncheckedCreateWithoutEvenementInput> | ReponseDiagnosticCreateWithoutEvenementInput[] | ReponseDiagnosticUncheckedCreateWithoutEvenementInput[]
    connectOrCreate?: ReponseDiagnosticCreateOrConnectWithoutEvenementInput | ReponseDiagnosticCreateOrConnectWithoutEvenementInput[]
    createMany?: ReponseDiagnosticCreateManyEvenementInputEnvelope
    connect?: ReponseDiagnosticWhereUniqueInput | ReponseDiagnosticWhereUniqueInput[]
  }

  export type ReponseDiagnosticUncheckedCreateNestedManyWithoutEvenementInput = {
    create?: XOR<ReponseDiagnosticCreateWithoutEvenementInput, ReponseDiagnosticUncheckedCreateWithoutEvenementInput> | ReponseDiagnosticCreateWithoutEvenementInput[] | ReponseDiagnosticUncheckedCreateWithoutEvenementInput[]
    connectOrCreate?: ReponseDiagnosticCreateOrConnectWithoutEvenementInput | ReponseDiagnosticCreateOrConnectWithoutEvenementInput[]
    createMany?: ReponseDiagnosticCreateManyEvenementInputEnvelope
    connect?: ReponseDiagnosticWhereUniqueInput | ReponseDiagnosticWhereUniqueInput[]
  }

  export type ReponseDiagnosticUpdateManyWithoutEvenementNestedInput = {
    create?: XOR<ReponseDiagnosticCreateWithoutEvenementInput, ReponseDiagnosticUncheckedCreateWithoutEvenementInput> | ReponseDiagnosticCreateWithoutEvenementInput[] | ReponseDiagnosticUncheckedCreateWithoutEvenementInput[]
    connectOrCreate?: ReponseDiagnosticCreateOrConnectWithoutEvenementInput | ReponseDiagnosticCreateOrConnectWithoutEvenementInput[]
    upsert?: ReponseDiagnosticUpsertWithWhereUniqueWithoutEvenementInput | ReponseDiagnosticUpsertWithWhereUniqueWithoutEvenementInput[]
    createMany?: ReponseDiagnosticCreateManyEvenementInputEnvelope
    set?: ReponseDiagnosticWhereUniqueInput | ReponseDiagnosticWhereUniqueInput[]
    disconnect?: ReponseDiagnosticWhereUniqueInput | ReponseDiagnosticWhereUniqueInput[]
    delete?: ReponseDiagnosticWhereUniqueInput | ReponseDiagnosticWhereUniqueInput[]
    connect?: ReponseDiagnosticWhereUniqueInput | ReponseDiagnosticWhereUniqueInput[]
    update?: ReponseDiagnosticUpdateWithWhereUniqueWithoutEvenementInput | ReponseDiagnosticUpdateWithWhereUniqueWithoutEvenementInput[]
    updateMany?: ReponseDiagnosticUpdateManyWithWhereWithoutEvenementInput | ReponseDiagnosticUpdateManyWithWhereWithoutEvenementInput[]
    deleteMany?: ReponseDiagnosticScalarWhereInput | ReponseDiagnosticScalarWhereInput[]
  }

  export type ReponseDiagnosticUncheckedUpdateManyWithoutEvenementNestedInput = {
    create?: XOR<ReponseDiagnosticCreateWithoutEvenementInput, ReponseDiagnosticUncheckedCreateWithoutEvenementInput> | ReponseDiagnosticCreateWithoutEvenementInput[] | ReponseDiagnosticUncheckedCreateWithoutEvenementInput[]
    connectOrCreate?: ReponseDiagnosticCreateOrConnectWithoutEvenementInput | ReponseDiagnosticCreateOrConnectWithoutEvenementInput[]
    upsert?: ReponseDiagnosticUpsertWithWhereUniqueWithoutEvenementInput | ReponseDiagnosticUpsertWithWhereUniqueWithoutEvenementInput[]
    createMany?: ReponseDiagnosticCreateManyEvenementInputEnvelope
    set?: ReponseDiagnosticWhereUniqueInput | ReponseDiagnosticWhereUniqueInput[]
    disconnect?: ReponseDiagnosticWhereUniqueInput | ReponseDiagnosticWhereUniqueInput[]
    delete?: ReponseDiagnosticWhereUniqueInput | ReponseDiagnosticWhereUniqueInput[]
    connect?: ReponseDiagnosticWhereUniqueInput | ReponseDiagnosticWhereUniqueInput[]
    update?: ReponseDiagnosticUpdateWithWhereUniqueWithoutEvenementInput | ReponseDiagnosticUpdateWithWhereUniqueWithoutEvenementInput[]
    updateMany?: ReponseDiagnosticUpdateManyWithWhereWithoutEvenementInput | ReponseDiagnosticUpdateManyWithWhereWithoutEvenementInput[]
    deleteMany?: ReponseDiagnosticScalarWhereInput | ReponseDiagnosticScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutResultatsDiagnosticInput = {
    create?: XOR<UserCreateWithoutResultatsDiagnosticInput, UserUncheckedCreateWithoutResultatsDiagnosticInput>
    connectOrCreate?: UserCreateOrConnectWithoutResultatsDiagnosticInput
    connect?: UserWhereUniqueInput
  }

  export type ReponseDiagnosticCreateNestedManyWithoutResultatInput = {
    create?: XOR<ReponseDiagnosticCreateWithoutResultatInput, ReponseDiagnosticUncheckedCreateWithoutResultatInput> | ReponseDiagnosticCreateWithoutResultatInput[] | ReponseDiagnosticUncheckedCreateWithoutResultatInput[]
    connectOrCreate?: ReponseDiagnosticCreateOrConnectWithoutResultatInput | ReponseDiagnosticCreateOrConnectWithoutResultatInput[]
    createMany?: ReponseDiagnosticCreateManyResultatInputEnvelope
    connect?: ReponseDiagnosticWhereUniqueInput | ReponseDiagnosticWhereUniqueInput[]
  }

  export type ReponseDiagnosticUncheckedCreateNestedManyWithoutResultatInput = {
    create?: XOR<ReponseDiagnosticCreateWithoutResultatInput, ReponseDiagnosticUncheckedCreateWithoutResultatInput> | ReponseDiagnosticCreateWithoutResultatInput[] | ReponseDiagnosticUncheckedCreateWithoutResultatInput[]
    connectOrCreate?: ReponseDiagnosticCreateOrConnectWithoutResultatInput | ReponseDiagnosticCreateOrConnectWithoutResultatInput[]
    createMany?: ReponseDiagnosticCreateManyResultatInputEnvelope
    connect?: ReponseDiagnosticWhereUniqueInput | ReponseDiagnosticWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutResultatsDiagnosticNestedInput = {
    create?: XOR<UserCreateWithoutResultatsDiagnosticInput, UserUncheckedCreateWithoutResultatsDiagnosticInput>
    connectOrCreate?: UserCreateOrConnectWithoutResultatsDiagnosticInput
    upsert?: UserUpsertWithoutResultatsDiagnosticInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutResultatsDiagnosticInput, UserUpdateWithoutResultatsDiagnosticInput>, UserUncheckedUpdateWithoutResultatsDiagnosticInput>
  }

  export type ReponseDiagnosticUpdateManyWithoutResultatNestedInput = {
    create?: XOR<ReponseDiagnosticCreateWithoutResultatInput, ReponseDiagnosticUncheckedCreateWithoutResultatInput> | ReponseDiagnosticCreateWithoutResultatInput[] | ReponseDiagnosticUncheckedCreateWithoutResultatInput[]
    connectOrCreate?: ReponseDiagnosticCreateOrConnectWithoutResultatInput | ReponseDiagnosticCreateOrConnectWithoutResultatInput[]
    upsert?: ReponseDiagnosticUpsertWithWhereUniqueWithoutResultatInput | ReponseDiagnosticUpsertWithWhereUniqueWithoutResultatInput[]
    createMany?: ReponseDiagnosticCreateManyResultatInputEnvelope
    set?: ReponseDiagnosticWhereUniqueInput | ReponseDiagnosticWhereUniqueInput[]
    disconnect?: ReponseDiagnosticWhereUniqueInput | ReponseDiagnosticWhereUniqueInput[]
    delete?: ReponseDiagnosticWhereUniqueInput | ReponseDiagnosticWhereUniqueInput[]
    connect?: ReponseDiagnosticWhereUniqueInput | ReponseDiagnosticWhereUniqueInput[]
    update?: ReponseDiagnosticUpdateWithWhereUniqueWithoutResultatInput | ReponseDiagnosticUpdateWithWhereUniqueWithoutResultatInput[]
    updateMany?: ReponseDiagnosticUpdateManyWithWhereWithoutResultatInput | ReponseDiagnosticUpdateManyWithWhereWithoutResultatInput[]
    deleteMany?: ReponseDiagnosticScalarWhereInput | ReponseDiagnosticScalarWhereInput[]
  }

  export type ReponseDiagnosticUncheckedUpdateManyWithoutResultatNestedInput = {
    create?: XOR<ReponseDiagnosticCreateWithoutResultatInput, ReponseDiagnosticUncheckedCreateWithoutResultatInput> | ReponseDiagnosticCreateWithoutResultatInput[] | ReponseDiagnosticUncheckedCreateWithoutResultatInput[]
    connectOrCreate?: ReponseDiagnosticCreateOrConnectWithoutResultatInput | ReponseDiagnosticCreateOrConnectWithoutResultatInput[]
    upsert?: ReponseDiagnosticUpsertWithWhereUniqueWithoutResultatInput | ReponseDiagnosticUpsertWithWhereUniqueWithoutResultatInput[]
    createMany?: ReponseDiagnosticCreateManyResultatInputEnvelope
    set?: ReponseDiagnosticWhereUniqueInput | ReponseDiagnosticWhereUniqueInput[]
    disconnect?: ReponseDiagnosticWhereUniqueInput | ReponseDiagnosticWhereUniqueInput[]
    delete?: ReponseDiagnosticWhereUniqueInput | ReponseDiagnosticWhereUniqueInput[]
    connect?: ReponseDiagnosticWhereUniqueInput | ReponseDiagnosticWhereUniqueInput[]
    update?: ReponseDiagnosticUpdateWithWhereUniqueWithoutResultatInput | ReponseDiagnosticUpdateWithWhereUniqueWithoutResultatInput[]
    updateMany?: ReponseDiagnosticUpdateManyWithWhereWithoutResultatInput | ReponseDiagnosticUpdateManyWithWhereWithoutResultatInput[]
    deleteMany?: ReponseDiagnosticScalarWhereInput | ReponseDiagnosticScalarWhereInput[]
  }

  export type ResultatDiagnosticCreateNestedOneWithoutReponsesInput = {
    create?: XOR<ResultatDiagnosticCreateWithoutReponsesInput, ResultatDiagnosticUncheckedCreateWithoutReponsesInput>
    connectOrCreate?: ResultatDiagnosticCreateOrConnectWithoutReponsesInput
    connect?: ResultatDiagnosticWhereUniqueInput
  }

  export type EvenementStressCreateNestedOneWithoutReponsesInput = {
    create?: XOR<EvenementStressCreateWithoutReponsesInput, EvenementStressUncheckedCreateWithoutReponsesInput>
    connectOrCreate?: EvenementStressCreateOrConnectWithoutReponsesInput
    connect?: EvenementStressWhereUniqueInput
  }

  export type ResultatDiagnosticUpdateOneRequiredWithoutReponsesNestedInput = {
    create?: XOR<ResultatDiagnosticCreateWithoutReponsesInput, ResultatDiagnosticUncheckedCreateWithoutReponsesInput>
    connectOrCreate?: ResultatDiagnosticCreateOrConnectWithoutReponsesInput
    upsert?: ResultatDiagnosticUpsertWithoutReponsesInput
    connect?: ResultatDiagnosticWhereUniqueInput
    update?: XOR<XOR<ResultatDiagnosticUpdateToOneWithWhereWithoutReponsesInput, ResultatDiagnosticUpdateWithoutReponsesInput>, ResultatDiagnosticUncheckedUpdateWithoutReponsesInput>
  }

  export type EvenementStressUpdateOneRequiredWithoutReponsesNestedInput = {
    create?: XOR<EvenementStressCreateWithoutReponsesInput, EvenementStressUncheckedCreateWithoutReponsesInput>
    connectOrCreate?: EvenementStressCreateOrConnectWithoutReponsesInput
    upsert?: EvenementStressUpsertWithoutReponsesInput
    connect?: EvenementStressWhereUniqueInput
    update?: XOR<XOR<EvenementStressUpdateToOneWithWhereWithoutReponsesInput, EvenementStressUpdateWithoutReponsesInput>, EvenementStressUncheckedUpdateWithoutReponsesInput>
  }

  export type EmotionNiveau2CreateNestedManyWithoutEmotionN1Input = {
    create?: XOR<EmotionNiveau2CreateWithoutEmotionN1Input, EmotionNiveau2UncheckedCreateWithoutEmotionN1Input> | EmotionNiveau2CreateWithoutEmotionN1Input[] | EmotionNiveau2UncheckedCreateWithoutEmotionN1Input[]
    connectOrCreate?: EmotionNiveau2CreateOrConnectWithoutEmotionN1Input | EmotionNiveau2CreateOrConnectWithoutEmotionN1Input[]
    createMany?: EmotionNiveau2CreateManyEmotionN1InputEnvelope
    connect?: EmotionNiveau2WhereUniqueInput | EmotionNiveau2WhereUniqueInput[]
  }

  export type EmotionNiveau2UncheckedCreateNestedManyWithoutEmotionN1Input = {
    create?: XOR<EmotionNiveau2CreateWithoutEmotionN1Input, EmotionNiveau2UncheckedCreateWithoutEmotionN1Input> | EmotionNiveau2CreateWithoutEmotionN1Input[] | EmotionNiveau2UncheckedCreateWithoutEmotionN1Input[]
    connectOrCreate?: EmotionNiveau2CreateOrConnectWithoutEmotionN1Input | EmotionNiveau2CreateOrConnectWithoutEmotionN1Input[]
    createMany?: EmotionNiveau2CreateManyEmotionN1InputEnvelope
    connect?: EmotionNiveau2WhereUniqueInput | EmotionNiveau2WhereUniqueInput[]
  }

  export type EmotionNiveau2UpdateManyWithoutEmotionN1NestedInput = {
    create?: XOR<EmotionNiveau2CreateWithoutEmotionN1Input, EmotionNiveau2UncheckedCreateWithoutEmotionN1Input> | EmotionNiveau2CreateWithoutEmotionN1Input[] | EmotionNiveau2UncheckedCreateWithoutEmotionN1Input[]
    connectOrCreate?: EmotionNiveau2CreateOrConnectWithoutEmotionN1Input | EmotionNiveau2CreateOrConnectWithoutEmotionN1Input[]
    upsert?: EmotionNiveau2UpsertWithWhereUniqueWithoutEmotionN1Input | EmotionNiveau2UpsertWithWhereUniqueWithoutEmotionN1Input[]
    createMany?: EmotionNiveau2CreateManyEmotionN1InputEnvelope
    set?: EmotionNiveau2WhereUniqueInput | EmotionNiveau2WhereUniqueInput[]
    disconnect?: EmotionNiveau2WhereUniqueInput | EmotionNiveau2WhereUniqueInput[]
    delete?: EmotionNiveau2WhereUniqueInput | EmotionNiveau2WhereUniqueInput[]
    connect?: EmotionNiveau2WhereUniqueInput | EmotionNiveau2WhereUniqueInput[]
    update?: EmotionNiveau2UpdateWithWhereUniqueWithoutEmotionN1Input | EmotionNiveau2UpdateWithWhereUniqueWithoutEmotionN1Input[]
    updateMany?: EmotionNiveau2UpdateManyWithWhereWithoutEmotionN1Input | EmotionNiveau2UpdateManyWithWhereWithoutEmotionN1Input[]
    deleteMany?: EmotionNiveau2ScalarWhereInput | EmotionNiveau2ScalarWhereInput[]
  }

  export type EmotionNiveau2UncheckedUpdateManyWithoutEmotionN1NestedInput = {
    create?: XOR<EmotionNiveau2CreateWithoutEmotionN1Input, EmotionNiveau2UncheckedCreateWithoutEmotionN1Input> | EmotionNiveau2CreateWithoutEmotionN1Input[] | EmotionNiveau2UncheckedCreateWithoutEmotionN1Input[]
    connectOrCreate?: EmotionNiveau2CreateOrConnectWithoutEmotionN1Input | EmotionNiveau2CreateOrConnectWithoutEmotionN1Input[]
    upsert?: EmotionNiveau2UpsertWithWhereUniqueWithoutEmotionN1Input | EmotionNiveau2UpsertWithWhereUniqueWithoutEmotionN1Input[]
    createMany?: EmotionNiveau2CreateManyEmotionN1InputEnvelope
    set?: EmotionNiveau2WhereUniqueInput | EmotionNiveau2WhereUniqueInput[]
    disconnect?: EmotionNiveau2WhereUniqueInput | EmotionNiveau2WhereUniqueInput[]
    delete?: EmotionNiveau2WhereUniqueInput | EmotionNiveau2WhereUniqueInput[]
    connect?: EmotionNiveau2WhereUniqueInput | EmotionNiveau2WhereUniqueInput[]
    update?: EmotionNiveau2UpdateWithWhereUniqueWithoutEmotionN1Input | EmotionNiveau2UpdateWithWhereUniqueWithoutEmotionN1Input[]
    updateMany?: EmotionNiveau2UpdateManyWithWhereWithoutEmotionN1Input | EmotionNiveau2UpdateManyWithWhereWithoutEmotionN1Input[]
    deleteMany?: EmotionNiveau2ScalarWhereInput | EmotionNiveau2ScalarWhereInput[]
  }

  export type EmotionNiveau1CreateNestedOneWithoutEmotionsN2Input = {
    create?: XOR<EmotionNiveau1CreateWithoutEmotionsN2Input, EmotionNiveau1UncheckedCreateWithoutEmotionsN2Input>
    connectOrCreate?: EmotionNiveau1CreateOrConnectWithoutEmotionsN2Input
    connect?: EmotionNiveau1WhereUniqueInput
  }

  export type JournalEmotionCreateNestedManyWithoutEmotionN2Input = {
    create?: XOR<JournalEmotionCreateWithoutEmotionN2Input, JournalEmotionUncheckedCreateWithoutEmotionN2Input> | JournalEmotionCreateWithoutEmotionN2Input[] | JournalEmotionUncheckedCreateWithoutEmotionN2Input[]
    connectOrCreate?: JournalEmotionCreateOrConnectWithoutEmotionN2Input | JournalEmotionCreateOrConnectWithoutEmotionN2Input[]
    createMany?: JournalEmotionCreateManyEmotionN2InputEnvelope
    connect?: JournalEmotionWhereUniqueInput | JournalEmotionWhereUniqueInput[]
  }

  export type JournalEmotionUncheckedCreateNestedManyWithoutEmotionN2Input = {
    create?: XOR<JournalEmotionCreateWithoutEmotionN2Input, JournalEmotionUncheckedCreateWithoutEmotionN2Input> | JournalEmotionCreateWithoutEmotionN2Input[] | JournalEmotionUncheckedCreateWithoutEmotionN2Input[]
    connectOrCreate?: JournalEmotionCreateOrConnectWithoutEmotionN2Input | JournalEmotionCreateOrConnectWithoutEmotionN2Input[]
    createMany?: JournalEmotionCreateManyEmotionN2InputEnvelope
    connect?: JournalEmotionWhereUniqueInput | JournalEmotionWhereUniqueInput[]
  }

  export type EmotionNiveau1UpdateOneRequiredWithoutEmotionsN2NestedInput = {
    create?: XOR<EmotionNiveau1CreateWithoutEmotionsN2Input, EmotionNiveau1UncheckedCreateWithoutEmotionsN2Input>
    connectOrCreate?: EmotionNiveau1CreateOrConnectWithoutEmotionsN2Input
    upsert?: EmotionNiveau1UpsertWithoutEmotionsN2Input
    connect?: EmotionNiveau1WhereUniqueInput
    update?: XOR<XOR<EmotionNiveau1UpdateToOneWithWhereWithoutEmotionsN2Input, EmotionNiveau1UpdateWithoutEmotionsN2Input>, EmotionNiveau1UncheckedUpdateWithoutEmotionsN2Input>
  }

  export type JournalEmotionUpdateManyWithoutEmotionN2NestedInput = {
    create?: XOR<JournalEmotionCreateWithoutEmotionN2Input, JournalEmotionUncheckedCreateWithoutEmotionN2Input> | JournalEmotionCreateWithoutEmotionN2Input[] | JournalEmotionUncheckedCreateWithoutEmotionN2Input[]
    connectOrCreate?: JournalEmotionCreateOrConnectWithoutEmotionN2Input | JournalEmotionCreateOrConnectWithoutEmotionN2Input[]
    upsert?: JournalEmotionUpsertWithWhereUniqueWithoutEmotionN2Input | JournalEmotionUpsertWithWhereUniqueWithoutEmotionN2Input[]
    createMany?: JournalEmotionCreateManyEmotionN2InputEnvelope
    set?: JournalEmotionWhereUniqueInput | JournalEmotionWhereUniqueInput[]
    disconnect?: JournalEmotionWhereUniqueInput | JournalEmotionWhereUniqueInput[]
    delete?: JournalEmotionWhereUniqueInput | JournalEmotionWhereUniqueInput[]
    connect?: JournalEmotionWhereUniqueInput | JournalEmotionWhereUniqueInput[]
    update?: JournalEmotionUpdateWithWhereUniqueWithoutEmotionN2Input | JournalEmotionUpdateWithWhereUniqueWithoutEmotionN2Input[]
    updateMany?: JournalEmotionUpdateManyWithWhereWithoutEmotionN2Input | JournalEmotionUpdateManyWithWhereWithoutEmotionN2Input[]
    deleteMany?: JournalEmotionScalarWhereInput | JournalEmotionScalarWhereInput[]
  }

  export type JournalEmotionUncheckedUpdateManyWithoutEmotionN2NestedInput = {
    create?: XOR<JournalEmotionCreateWithoutEmotionN2Input, JournalEmotionUncheckedCreateWithoutEmotionN2Input> | JournalEmotionCreateWithoutEmotionN2Input[] | JournalEmotionUncheckedCreateWithoutEmotionN2Input[]
    connectOrCreate?: JournalEmotionCreateOrConnectWithoutEmotionN2Input | JournalEmotionCreateOrConnectWithoutEmotionN2Input[]
    upsert?: JournalEmotionUpsertWithWhereUniqueWithoutEmotionN2Input | JournalEmotionUpsertWithWhereUniqueWithoutEmotionN2Input[]
    createMany?: JournalEmotionCreateManyEmotionN2InputEnvelope
    set?: JournalEmotionWhereUniqueInput | JournalEmotionWhereUniqueInput[]
    disconnect?: JournalEmotionWhereUniqueInput | JournalEmotionWhereUniqueInput[]
    delete?: JournalEmotionWhereUniqueInput | JournalEmotionWhereUniqueInput[]
    connect?: JournalEmotionWhereUniqueInput | JournalEmotionWhereUniqueInput[]
    update?: JournalEmotionUpdateWithWhereUniqueWithoutEmotionN2Input | JournalEmotionUpdateWithWhereUniqueWithoutEmotionN2Input[]
    updateMany?: JournalEmotionUpdateManyWithWhereWithoutEmotionN2Input | JournalEmotionUpdateManyWithWhereWithoutEmotionN2Input[]
    deleteMany?: JournalEmotionScalarWhereInput | JournalEmotionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutJournalEmotionsInput = {
    create?: XOR<UserCreateWithoutJournalEmotionsInput, UserUncheckedCreateWithoutJournalEmotionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutJournalEmotionsInput
    connect?: UserWhereUniqueInput
  }

  export type EmotionNiveau2CreateNestedOneWithoutJournauxInput = {
    create?: XOR<EmotionNiveau2CreateWithoutJournauxInput, EmotionNiveau2UncheckedCreateWithoutJournauxInput>
    connectOrCreate?: EmotionNiveau2CreateOrConnectWithoutJournauxInput
    connect?: EmotionNiveau2WhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutJournalEmotionsNestedInput = {
    create?: XOR<UserCreateWithoutJournalEmotionsInput, UserUncheckedCreateWithoutJournalEmotionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutJournalEmotionsInput
    upsert?: UserUpsertWithoutJournalEmotionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutJournalEmotionsInput, UserUpdateWithoutJournalEmotionsInput>, UserUncheckedUpdateWithoutJournalEmotionsInput>
  }

  export type EmotionNiveau2UpdateOneRequiredWithoutJournauxNestedInput = {
    create?: XOR<EmotionNiveau2CreateWithoutJournauxInput, EmotionNiveau2UncheckedCreateWithoutJournauxInput>
    connectOrCreate?: EmotionNiveau2CreateOrConnectWithoutJournauxInput
    upsert?: EmotionNiveau2UpsertWithoutJournauxInput
    connect?: EmotionNiveau2WhereUniqueInput
    update?: XOR<XOR<EmotionNiveau2UpdateToOneWithWhereWithoutJournauxInput, EmotionNiveau2UpdateWithoutJournauxInput>, EmotionNiveau2UncheckedUpdateWithoutJournauxInput>
  }

  export type UserCreateNestedOneWithoutSupportTicketsInput = {
    create?: XOR<UserCreateWithoutSupportTicketsInput, UserUncheckedCreateWithoutSupportTicketsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSupportTicketsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumSupportCategoryFieldUpdateOperationsInput = {
    set?: $Enums.SupportCategory
  }

  export type UserUpdateOneRequiredWithoutSupportTicketsNestedInput = {
    create?: XOR<UserCreateWithoutSupportTicketsInput, UserUncheckedCreateWithoutSupportTicketsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSupportTicketsInput
    upsert?: UserUpsertWithoutSupportTicketsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSupportTicketsInput, UserUpdateWithoutSupportTicketsInput>, UserUncheckedUpdateWithoutSupportTicketsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumSupportCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.SupportCategory | EnumSupportCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.SupportCategory[]
    notIn?: $Enums.SupportCategory[]
    not?: NestedEnumSupportCategoryFilter<$PrismaModel> | $Enums.SupportCategory
  }

  export type NestedEnumSupportCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SupportCategory | EnumSupportCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.SupportCategory[]
    notIn?: $Enums.SupportCategory[]
    not?: NestedEnumSupportCategoryWithAggregatesFilter<$PrismaModel> | $Enums.SupportCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSupportCategoryFilter<$PrismaModel>
    _max?: NestedEnumSupportCategoryFilter<$PrismaModel>
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PageInfoCreateWithoutAuteurInput = {
    id?: string
    titre: string
    slug: string
    contenu: string
    dateCreation?: Date | string
    dateMaj?: Date | string
    isPublie?: boolean
  }

  export type PageInfoUncheckedCreateWithoutAuteurInput = {
    id?: string
    titre: string
    slug: string
    contenu: string
    dateCreation?: Date | string
    dateMaj?: Date | string
    isPublie?: boolean
  }

  export type PageInfoCreateOrConnectWithoutAuteurInput = {
    where: PageInfoWhereUniqueInput
    create: XOR<PageInfoCreateWithoutAuteurInput, PageInfoUncheckedCreateWithoutAuteurInput>
  }

  export type PageInfoCreateManyAuteurInputEnvelope = {
    data: PageInfoCreateManyAuteurInput | PageInfoCreateManyAuteurInput[]
    skipDuplicates?: boolean
  }

  export type ResultatDiagnosticCreateWithoutUtilisateurInput = {
    id?: string
    dateEvaluation?: Date | string
    scoreTotal: number
    niveauStress: string
    reponses?: ReponseDiagnosticCreateNestedManyWithoutResultatInput
  }

  export type ResultatDiagnosticUncheckedCreateWithoutUtilisateurInput = {
    id?: string
    dateEvaluation?: Date | string
    scoreTotal: number
    niveauStress: string
    reponses?: ReponseDiagnosticUncheckedCreateNestedManyWithoutResultatInput
  }

  export type ResultatDiagnosticCreateOrConnectWithoutUtilisateurInput = {
    where: ResultatDiagnosticWhereUniqueInput
    create: XOR<ResultatDiagnosticCreateWithoutUtilisateurInput, ResultatDiagnosticUncheckedCreateWithoutUtilisateurInput>
  }

  export type ResultatDiagnosticCreateManyUtilisateurInputEnvelope = {
    data: ResultatDiagnosticCreateManyUtilisateurInput | ResultatDiagnosticCreateManyUtilisateurInput[]
    skipDuplicates?: boolean
  }

  export type JournalEmotionCreateWithoutUtilisateurInput = {
    id?: string
    notePersonnelle?: string | null
    dateEnregistrement?: Date | string
    emotionN2: EmotionNiveau2CreateNestedOneWithoutJournauxInput
  }

  export type JournalEmotionUncheckedCreateWithoutUtilisateurInput = {
    id?: string
    notePersonnelle?: string | null
    dateEnregistrement?: Date | string
    emotionN2Id: string
  }

  export type JournalEmotionCreateOrConnectWithoutUtilisateurInput = {
    where: JournalEmotionWhereUniqueInput
    create: XOR<JournalEmotionCreateWithoutUtilisateurInput, JournalEmotionUncheckedCreateWithoutUtilisateurInput>
  }

  export type JournalEmotionCreateManyUtilisateurInputEnvelope = {
    data: JournalEmotionCreateManyUtilisateurInput | JournalEmotionCreateManyUtilisateurInput[]
    skipDuplicates?: boolean
  }

  export type SupportTicketCreateWithoutUtilisateurInput = {
    id?: string
    glpiTicketId: number
    category: $Enums.SupportCategory
    subject: string
    statusCode?: number
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupportTicketUncheckedCreateWithoutUtilisateurInput = {
    id?: string
    glpiTicketId: number
    category: $Enums.SupportCategory
    subject: string
    statusCode?: number
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupportTicketCreateOrConnectWithoutUtilisateurInput = {
    where: SupportTicketWhereUniqueInput
    create: XOR<SupportTicketCreateWithoutUtilisateurInput, SupportTicketUncheckedCreateWithoutUtilisateurInput>
  }

  export type SupportTicketCreateManyUtilisateurInputEnvelope = {
    data: SupportTicketCreateManyUtilisateurInput | SupportTicketCreateManyUtilisateurInput[]
    skipDuplicates?: boolean
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type PageInfoUpsertWithWhereUniqueWithoutAuteurInput = {
    where: PageInfoWhereUniqueInput
    update: XOR<PageInfoUpdateWithoutAuteurInput, PageInfoUncheckedUpdateWithoutAuteurInput>
    create: XOR<PageInfoCreateWithoutAuteurInput, PageInfoUncheckedCreateWithoutAuteurInput>
  }

  export type PageInfoUpdateWithWhereUniqueWithoutAuteurInput = {
    where: PageInfoWhereUniqueInput
    data: XOR<PageInfoUpdateWithoutAuteurInput, PageInfoUncheckedUpdateWithoutAuteurInput>
  }

  export type PageInfoUpdateManyWithWhereWithoutAuteurInput = {
    where: PageInfoScalarWhereInput
    data: XOR<PageInfoUpdateManyMutationInput, PageInfoUncheckedUpdateManyWithoutAuteurInput>
  }

  export type PageInfoScalarWhereInput = {
    AND?: PageInfoScalarWhereInput | PageInfoScalarWhereInput[]
    OR?: PageInfoScalarWhereInput[]
    NOT?: PageInfoScalarWhereInput | PageInfoScalarWhereInput[]
    id?: StringFilter<"PageInfo"> | string
    titre?: StringFilter<"PageInfo"> | string
    slug?: StringFilter<"PageInfo"> | string
    contenu?: StringFilter<"PageInfo"> | string
    dateCreation?: DateTimeFilter<"PageInfo"> | Date | string
    dateMaj?: DateTimeFilter<"PageInfo"> | Date | string
    isPublie?: BoolFilter<"PageInfo"> | boolean
    auteurId?: StringFilter<"PageInfo"> | string
  }

  export type ResultatDiagnosticUpsertWithWhereUniqueWithoutUtilisateurInput = {
    where: ResultatDiagnosticWhereUniqueInput
    update: XOR<ResultatDiagnosticUpdateWithoutUtilisateurInput, ResultatDiagnosticUncheckedUpdateWithoutUtilisateurInput>
    create: XOR<ResultatDiagnosticCreateWithoutUtilisateurInput, ResultatDiagnosticUncheckedCreateWithoutUtilisateurInput>
  }

  export type ResultatDiagnosticUpdateWithWhereUniqueWithoutUtilisateurInput = {
    where: ResultatDiagnosticWhereUniqueInput
    data: XOR<ResultatDiagnosticUpdateWithoutUtilisateurInput, ResultatDiagnosticUncheckedUpdateWithoutUtilisateurInput>
  }

  export type ResultatDiagnosticUpdateManyWithWhereWithoutUtilisateurInput = {
    where: ResultatDiagnosticScalarWhereInput
    data: XOR<ResultatDiagnosticUpdateManyMutationInput, ResultatDiagnosticUncheckedUpdateManyWithoutUtilisateurInput>
  }

  export type ResultatDiagnosticScalarWhereInput = {
    AND?: ResultatDiagnosticScalarWhereInput | ResultatDiagnosticScalarWhereInput[]
    OR?: ResultatDiagnosticScalarWhereInput[]
    NOT?: ResultatDiagnosticScalarWhereInput | ResultatDiagnosticScalarWhereInput[]
    id?: StringFilter<"ResultatDiagnostic"> | string
    dateEvaluation?: DateTimeFilter<"ResultatDiagnostic"> | Date | string
    scoreTotal?: IntFilter<"ResultatDiagnostic"> | number
    niveauStress?: StringFilter<"ResultatDiagnostic"> | string
    utilisateurId?: StringFilter<"ResultatDiagnostic"> | string
  }

  export type JournalEmotionUpsertWithWhereUniqueWithoutUtilisateurInput = {
    where: JournalEmotionWhereUniqueInput
    update: XOR<JournalEmotionUpdateWithoutUtilisateurInput, JournalEmotionUncheckedUpdateWithoutUtilisateurInput>
    create: XOR<JournalEmotionCreateWithoutUtilisateurInput, JournalEmotionUncheckedCreateWithoutUtilisateurInput>
  }

  export type JournalEmotionUpdateWithWhereUniqueWithoutUtilisateurInput = {
    where: JournalEmotionWhereUniqueInput
    data: XOR<JournalEmotionUpdateWithoutUtilisateurInput, JournalEmotionUncheckedUpdateWithoutUtilisateurInput>
  }

  export type JournalEmotionUpdateManyWithWhereWithoutUtilisateurInput = {
    where: JournalEmotionScalarWhereInput
    data: XOR<JournalEmotionUpdateManyMutationInput, JournalEmotionUncheckedUpdateManyWithoutUtilisateurInput>
  }

  export type JournalEmotionScalarWhereInput = {
    AND?: JournalEmotionScalarWhereInput | JournalEmotionScalarWhereInput[]
    OR?: JournalEmotionScalarWhereInput[]
    NOT?: JournalEmotionScalarWhereInput | JournalEmotionScalarWhereInput[]
    id?: StringFilter<"JournalEmotion"> | string
    notePersonnelle?: StringNullableFilter<"JournalEmotion"> | string | null
    dateEnregistrement?: DateTimeFilter<"JournalEmotion"> | Date | string
    utilisateurId?: StringFilter<"JournalEmotion"> | string
    emotionN2Id?: StringFilter<"JournalEmotion"> | string
  }

  export type SupportTicketUpsertWithWhereUniqueWithoutUtilisateurInput = {
    where: SupportTicketWhereUniqueInput
    update: XOR<SupportTicketUpdateWithoutUtilisateurInput, SupportTicketUncheckedUpdateWithoutUtilisateurInput>
    create: XOR<SupportTicketCreateWithoutUtilisateurInput, SupportTicketUncheckedCreateWithoutUtilisateurInput>
  }

  export type SupportTicketUpdateWithWhereUniqueWithoutUtilisateurInput = {
    where: SupportTicketWhereUniqueInput
    data: XOR<SupportTicketUpdateWithoutUtilisateurInput, SupportTicketUncheckedUpdateWithoutUtilisateurInput>
  }

  export type SupportTicketUpdateManyWithWhereWithoutUtilisateurInput = {
    where: SupportTicketScalarWhereInput
    data: XOR<SupportTicketUpdateManyMutationInput, SupportTicketUncheckedUpdateManyWithoutUtilisateurInput>
  }

  export type SupportTicketScalarWhereInput = {
    AND?: SupportTicketScalarWhereInput | SupportTicketScalarWhereInput[]
    OR?: SupportTicketScalarWhereInput[]
    NOT?: SupportTicketScalarWhereInput | SupportTicketScalarWhereInput[]
    id?: StringFilter<"SupportTicket"> | string
    glpiTicketId?: IntFilter<"SupportTicket"> | number
    category?: EnumSupportCategoryFilter<"SupportTicket"> | $Enums.SupportCategory
    subject?: StringFilter<"SupportTicket"> | string
    statusCode?: IntFilter<"SupportTicket"> | number
    lastSyncedAt?: DateTimeNullableFilter<"SupportTicket"> | Date | string | null
    createdAt?: DateTimeFilter<"SupportTicket"> | Date | string
    updatedAt?: DateTimeFilter<"SupportTicket"> | Date | string
    utilisateurId?: StringFilter<"SupportTicket"> | string
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    firstName: string
    lastName: string
    age?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.Role
    isActif?: boolean
    dateConsentement?: Date | string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    pagesRedigees?: PageInfoCreateNestedManyWithoutAuteurInput
    resultatsDiagnostic?: ResultatDiagnosticCreateNestedManyWithoutUtilisateurInput
    journalEmotions?: JournalEmotionCreateNestedManyWithoutUtilisateurInput
    supportTickets?: SupportTicketCreateNestedManyWithoutUtilisateurInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    firstName: string
    lastName: string
    age?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.Role
    isActif?: boolean
    dateConsentement?: Date | string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    pagesRedigees?: PageInfoUncheckedCreateNestedManyWithoutAuteurInput
    resultatsDiagnostic?: ResultatDiagnosticUncheckedCreateNestedManyWithoutUtilisateurInput
    journalEmotions?: JournalEmotionUncheckedCreateNestedManyWithoutUtilisateurInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutUtilisateurInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActif?: BoolFieldUpdateOperationsInput | boolean
    dateConsentement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    pagesRedigees?: PageInfoUpdateManyWithoutAuteurNestedInput
    resultatsDiagnostic?: ResultatDiagnosticUpdateManyWithoutUtilisateurNestedInput
    journalEmotions?: JournalEmotionUpdateManyWithoutUtilisateurNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutUtilisateurNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActif?: BoolFieldUpdateOperationsInput | boolean
    dateConsentement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    pagesRedigees?: PageInfoUncheckedUpdateManyWithoutAuteurNestedInput
    resultatsDiagnostic?: ResultatDiagnosticUncheckedUpdateManyWithoutUtilisateurNestedInput
    journalEmotions?: JournalEmotionUncheckedUpdateManyWithoutUtilisateurNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutUtilisateurNestedInput
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    firstName: string
    lastName: string
    age?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.Role
    isActif?: boolean
    dateConsentement?: Date | string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    pagesRedigees?: PageInfoCreateNestedManyWithoutAuteurInput
    resultatsDiagnostic?: ResultatDiagnosticCreateNestedManyWithoutUtilisateurInput
    journalEmotions?: JournalEmotionCreateNestedManyWithoutUtilisateurInput
    supportTickets?: SupportTicketCreateNestedManyWithoutUtilisateurInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    firstName: string
    lastName: string
    age?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.Role
    isActif?: boolean
    dateConsentement?: Date | string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    pagesRedigees?: PageInfoUncheckedCreateNestedManyWithoutAuteurInput
    resultatsDiagnostic?: ResultatDiagnosticUncheckedCreateNestedManyWithoutUtilisateurInput
    journalEmotions?: JournalEmotionUncheckedCreateNestedManyWithoutUtilisateurInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutUtilisateurInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActif?: BoolFieldUpdateOperationsInput | boolean
    dateConsentement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    pagesRedigees?: PageInfoUpdateManyWithoutAuteurNestedInput
    resultatsDiagnostic?: ResultatDiagnosticUpdateManyWithoutUtilisateurNestedInput
    journalEmotions?: JournalEmotionUpdateManyWithoutUtilisateurNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutUtilisateurNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActif?: BoolFieldUpdateOperationsInput | boolean
    dateConsentement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    pagesRedigees?: PageInfoUncheckedUpdateManyWithoutAuteurNestedInput
    resultatsDiagnostic?: ResultatDiagnosticUncheckedUpdateManyWithoutUtilisateurNestedInput
    journalEmotions?: JournalEmotionUncheckedUpdateManyWithoutUtilisateurNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutUtilisateurNestedInput
  }

  export type UserCreateWithoutPagesRedigeesInput = {
    id?: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    firstName: string
    lastName: string
    age?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.Role
    isActif?: boolean
    dateConsentement?: Date | string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    resultatsDiagnostic?: ResultatDiagnosticCreateNestedManyWithoutUtilisateurInput
    journalEmotions?: JournalEmotionCreateNestedManyWithoutUtilisateurInput
    supportTickets?: SupportTicketCreateNestedManyWithoutUtilisateurInput
  }

  export type UserUncheckedCreateWithoutPagesRedigeesInput = {
    id?: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    firstName: string
    lastName: string
    age?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.Role
    isActif?: boolean
    dateConsentement?: Date | string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    resultatsDiagnostic?: ResultatDiagnosticUncheckedCreateNestedManyWithoutUtilisateurInput
    journalEmotions?: JournalEmotionUncheckedCreateNestedManyWithoutUtilisateurInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutUtilisateurInput
  }

  export type UserCreateOrConnectWithoutPagesRedigeesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPagesRedigeesInput, UserUncheckedCreateWithoutPagesRedigeesInput>
  }

  export type UserUpsertWithoutPagesRedigeesInput = {
    update: XOR<UserUpdateWithoutPagesRedigeesInput, UserUncheckedUpdateWithoutPagesRedigeesInput>
    create: XOR<UserCreateWithoutPagesRedigeesInput, UserUncheckedCreateWithoutPagesRedigeesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPagesRedigeesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPagesRedigeesInput, UserUncheckedUpdateWithoutPagesRedigeesInput>
  }

  export type UserUpdateWithoutPagesRedigeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActif?: BoolFieldUpdateOperationsInput | boolean
    dateConsentement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    resultatsDiagnostic?: ResultatDiagnosticUpdateManyWithoutUtilisateurNestedInput
    journalEmotions?: JournalEmotionUpdateManyWithoutUtilisateurNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutUtilisateurNestedInput
  }

  export type UserUncheckedUpdateWithoutPagesRedigeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActif?: BoolFieldUpdateOperationsInput | boolean
    dateConsentement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    resultatsDiagnostic?: ResultatDiagnosticUncheckedUpdateManyWithoutUtilisateurNestedInput
    journalEmotions?: JournalEmotionUncheckedUpdateManyWithoutUtilisateurNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutUtilisateurNestedInput
  }

  export type ReponseDiagnosticCreateWithoutEvenementInput = {
    resultat: ResultatDiagnosticCreateNestedOneWithoutReponsesInput
  }

  export type ReponseDiagnosticUncheckedCreateWithoutEvenementInput = {
    resultatId: string
  }

  export type ReponseDiagnosticCreateOrConnectWithoutEvenementInput = {
    where: ReponseDiagnosticWhereUniqueInput
    create: XOR<ReponseDiagnosticCreateWithoutEvenementInput, ReponseDiagnosticUncheckedCreateWithoutEvenementInput>
  }

  export type ReponseDiagnosticCreateManyEvenementInputEnvelope = {
    data: ReponseDiagnosticCreateManyEvenementInput | ReponseDiagnosticCreateManyEvenementInput[]
    skipDuplicates?: boolean
  }

  export type ReponseDiagnosticUpsertWithWhereUniqueWithoutEvenementInput = {
    where: ReponseDiagnosticWhereUniqueInput
    update: XOR<ReponseDiagnosticUpdateWithoutEvenementInput, ReponseDiagnosticUncheckedUpdateWithoutEvenementInput>
    create: XOR<ReponseDiagnosticCreateWithoutEvenementInput, ReponseDiagnosticUncheckedCreateWithoutEvenementInput>
  }

  export type ReponseDiagnosticUpdateWithWhereUniqueWithoutEvenementInput = {
    where: ReponseDiagnosticWhereUniqueInput
    data: XOR<ReponseDiagnosticUpdateWithoutEvenementInput, ReponseDiagnosticUncheckedUpdateWithoutEvenementInput>
  }

  export type ReponseDiagnosticUpdateManyWithWhereWithoutEvenementInput = {
    where: ReponseDiagnosticScalarWhereInput
    data: XOR<ReponseDiagnosticUpdateManyMutationInput, ReponseDiagnosticUncheckedUpdateManyWithoutEvenementInput>
  }

  export type ReponseDiagnosticScalarWhereInput = {
    AND?: ReponseDiagnosticScalarWhereInput | ReponseDiagnosticScalarWhereInput[]
    OR?: ReponseDiagnosticScalarWhereInput[]
    NOT?: ReponseDiagnosticScalarWhereInput | ReponseDiagnosticScalarWhereInput[]
    resultatId?: StringFilter<"ReponseDiagnostic"> | string
    evenementId?: StringFilter<"ReponseDiagnostic"> | string
  }

  export type UserCreateWithoutResultatsDiagnosticInput = {
    id?: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    firstName: string
    lastName: string
    age?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.Role
    isActif?: boolean
    dateConsentement?: Date | string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    pagesRedigees?: PageInfoCreateNestedManyWithoutAuteurInput
    journalEmotions?: JournalEmotionCreateNestedManyWithoutUtilisateurInput
    supportTickets?: SupportTicketCreateNestedManyWithoutUtilisateurInput
  }

  export type UserUncheckedCreateWithoutResultatsDiagnosticInput = {
    id?: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    firstName: string
    lastName: string
    age?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.Role
    isActif?: boolean
    dateConsentement?: Date | string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    pagesRedigees?: PageInfoUncheckedCreateNestedManyWithoutAuteurInput
    journalEmotions?: JournalEmotionUncheckedCreateNestedManyWithoutUtilisateurInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutUtilisateurInput
  }

  export type UserCreateOrConnectWithoutResultatsDiagnosticInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutResultatsDiagnosticInput, UserUncheckedCreateWithoutResultatsDiagnosticInput>
  }

  export type ReponseDiagnosticCreateWithoutResultatInput = {
    evenement: EvenementStressCreateNestedOneWithoutReponsesInput
  }

  export type ReponseDiagnosticUncheckedCreateWithoutResultatInput = {
    evenementId: string
  }

  export type ReponseDiagnosticCreateOrConnectWithoutResultatInput = {
    where: ReponseDiagnosticWhereUniqueInput
    create: XOR<ReponseDiagnosticCreateWithoutResultatInput, ReponseDiagnosticUncheckedCreateWithoutResultatInput>
  }

  export type ReponseDiagnosticCreateManyResultatInputEnvelope = {
    data: ReponseDiagnosticCreateManyResultatInput | ReponseDiagnosticCreateManyResultatInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutResultatsDiagnosticInput = {
    update: XOR<UserUpdateWithoutResultatsDiagnosticInput, UserUncheckedUpdateWithoutResultatsDiagnosticInput>
    create: XOR<UserCreateWithoutResultatsDiagnosticInput, UserUncheckedCreateWithoutResultatsDiagnosticInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutResultatsDiagnosticInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutResultatsDiagnosticInput, UserUncheckedUpdateWithoutResultatsDiagnosticInput>
  }

  export type UserUpdateWithoutResultatsDiagnosticInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActif?: BoolFieldUpdateOperationsInput | boolean
    dateConsentement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    pagesRedigees?: PageInfoUpdateManyWithoutAuteurNestedInput
    journalEmotions?: JournalEmotionUpdateManyWithoutUtilisateurNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutUtilisateurNestedInput
  }

  export type UserUncheckedUpdateWithoutResultatsDiagnosticInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActif?: BoolFieldUpdateOperationsInput | boolean
    dateConsentement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    pagesRedigees?: PageInfoUncheckedUpdateManyWithoutAuteurNestedInput
    journalEmotions?: JournalEmotionUncheckedUpdateManyWithoutUtilisateurNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutUtilisateurNestedInput
  }

  export type ReponseDiagnosticUpsertWithWhereUniqueWithoutResultatInput = {
    where: ReponseDiagnosticWhereUniqueInput
    update: XOR<ReponseDiagnosticUpdateWithoutResultatInput, ReponseDiagnosticUncheckedUpdateWithoutResultatInput>
    create: XOR<ReponseDiagnosticCreateWithoutResultatInput, ReponseDiagnosticUncheckedCreateWithoutResultatInput>
  }

  export type ReponseDiagnosticUpdateWithWhereUniqueWithoutResultatInput = {
    where: ReponseDiagnosticWhereUniqueInput
    data: XOR<ReponseDiagnosticUpdateWithoutResultatInput, ReponseDiagnosticUncheckedUpdateWithoutResultatInput>
  }

  export type ReponseDiagnosticUpdateManyWithWhereWithoutResultatInput = {
    where: ReponseDiagnosticScalarWhereInput
    data: XOR<ReponseDiagnosticUpdateManyMutationInput, ReponseDiagnosticUncheckedUpdateManyWithoutResultatInput>
  }

  export type ResultatDiagnosticCreateWithoutReponsesInput = {
    id?: string
    dateEvaluation?: Date | string
    scoreTotal: number
    niveauStress: string
    utilisateur: UserCreateNestedOneWithoutResultatsDiagnosticInput
  }

  export type ResultatDiagnosticUncheckedCreateWithoutReponsesInput = {
    id?: string
    dateEvaluation?: Date | string
    scoreTotal: number
    niveauStress: string
    utilisateurId: string
  }

  export type ResultatDiagnosticCreateOrConnectWithoutReponsesInput = {
    where: ResultatDiagnosticWhereUniqueInput
    create: XOR<ResultatDiagnosticCreateWithoutReponsesInput, ResultatDiagnosticUncheckedCreateWithoutReponsesInput>
  }

  export type EvenementStressCreateWithoutReponsesInput = {
    id?: string
    description: string
    points: number
    isActif?: boolean
  }

  export type EvenementStressUncheckedCreateWithoutReponsesInput = {
    id?: string
    description: string
    points: number
    isActif?: boolean
  }

  export type EvenementStressCreateOrConnectWithoutReponsesInput = {
    where: EvenementStressWhereUniqueInput
    create: XOR<EvenementStressCreateWithoutReponsesInput, EvenementStressUncheckedCreateWithoutReponsesInput>
  }

  export type ResultatDiagnosticUpsertWithoutReponsesInput = {
    update: XOR<ResultatDiagnosticUpdateWithoutReponsesInput, ResultatDiagnosticUncheckedUpdateWithoutReponsesInput>
    create: XOR<ResultatDiagnosticCreateWithoutReponsesInput, ResultatDiagnosticUncheckedCreateWithoutReponsesInput>
    where?: ResultatDiagnosticWhereInput
  }

  export type ResultatDiagnosticUpdateToOneWithWhereWithoutReponsesInput = {
    where?: ResultatDiagnosticWhereInput
    data: XOR<ResultatDiagnosticUpdateWithoutReponsesInput, ResultatDiagnosticUncheckedUpdateWithoutReponsesInput>
  }

  export type ResultatDiagnosticUpdateWithoutReponsesInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateEvaluation?: DateTimeFieldUpdateOperationsInput | Date | string
    scoreTotal?: IntFieldUpdateOperationsInput | number
    niveauStress?: StringFieldUpdateOperationsInput | string
    utilisateur?: UserUpdateOneRequiredWithoutResultatsDiagnosticNestedInput
  }

  export type ResultatDiagnosticUncheckedUpdateWithoutReponsesInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateEvaluation?: DateTimeFieldUpdateOperationsInput | Date | string
    scoreTotal?: IntFieldUpdateOperationsInput | number
    niveauStress?: StringFieldUpdateOperationsInput | string
    utilisateurId?: StringFieldUpdateOperationsInput | string
  }

  export type EvenementStressUpsertWithoutReponsesInput = {
    update: XOR<EvenementStressUpdateWithoutReponsesInput, EvenementStressUncheckedUpdateWithoutReponsesInput>
    create: XOR<EvenementStressCreateWithoutReponsesInput, EvenementStressUncheckedCreateWithoutReponsesInput>
    where?: EvenementStressWhereInput
  }

  export type EvenementStressUpdateToOneWithWhereWithoutReponsesInput = {
    where?: EvenementStressWhereInput
    data: XOR<EvenementStressUpdateWithoutReponsesInput, EvenementStressUncheckedUpdateWithoutReponsesInput>
  }

  export type EvenementStressUpdateWithoutReponsesInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    isActif?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EvenementStressUncheckedUpdateWithoutReponsesInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    isActif?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmotionNiveau2CreateWithoutEmotionN1Input = {
    id?: string
    libelle: string
    journaux?: JournalEmotionCreateNestedManyWithoutEmotionN2Input
  }

  export type EmotionNiveau2UncheckedCreateWithoutEmotionN1Input = {
    id?: string
    libelle: string
    journaux?: JournalEmotionUncheckedCreateNestedManyWithoutEmotionN2Input
  }

  export type EmotionNiveau2CreateOrConnectWithoutEmotionN1Input = {
    where: EmotionNiveau2WhereUniqueInput
    create: XOR<EmotionNiveau2CreateWithoutEmotionN1Input, EmotionNiveau2UncheckedCreateWithoutEmotionN1Input>
  }

  export type EmotionNiveau2CreateManyEmotionN1InputEnvelope = {
    data: EmotionNiveau2CreateManyEmotionN1Input | EmotionNiveau2CreateManyEmotionN1Input[]
    skipDuplicates?: boolean
  }

  export type EmotionNiveau2UpsertWithWhereUniqueWithoutEmotionN1Input = {
    where: EmotionNiveau2WhereUniqueInput
    update: XOR<EmotionNiveau2UpdateWithoutEmotionN1Input, EmotionNiveau2UncheckedUpdateWithoutEmotionN1Input>
    create: XOR<EmotionNiveau2CreateWithoutEmotionN1Input, EmotionNiveau2UncheckedCreateWithoutEmotionN1Input>
  }

  export type EmotionNiveau2UpdateWithWhereUniqueWithoutEmotionN1Input = {
    where: EmotionNiveau2WhereUniqueInput
    data: XOR<EmotionNiveau2UpdateWithoutEmotionN1Input, EmotionNiveau2UncheckedUpdateWithoutEmotionN1Input>
  }

  export type EmotionNiveau2UpdateManyWithWhereWithoutEmotionN1Input = {
    where: EmotionNiveau2ScalarWhereInput
    data: XOR<EmotionNiveau2UpdateManyMutationInput, EmotionNiveau2UncheckedUpdateManyWithoutEmotionN1Input>
  }

  export type EmotionNiveau2ScalarWhereInput = {
    AND?: EmotionNiveau2ScalarWhereInput | EmotionNiveau2ScalarWhereInput[]
    OR?: EmotionNiveau2ScalarWhereInput[]
    NOT?: EmotionNiveau2ScalarWhereInput | EmotionNiveau2ScalarWhereInput[]
    id?: StringFilter<"EmotionNiveau2"> | string
    libelle?: StringFilter<"EmotionNiveau2"> | string
    emotionN1Id?: StringFilter<"EmotionNiveau2"> | string
  }

  export type EmotionNiveau1CreateWithoutEmotionsN2Input = {
    id?: string
    libelle: string
  }

  export type EmotionNiveau1UncheckedCreateWithoutEmotionsN2Input = {
    id?: string
    libelle: string
  }

  export type EmotionNiveau1CreateOrConnectWithoutEmotionsN2Input = {
    where: EmotionNiveau1WhereUniqueInput
    create: XOR<EmotionNiveau1CreateWithoutEmotionsN2Input, EmotionNiveau1UncheckedCreateWithoutEmotionsN2Input>
  }

  export type JournalEmotionCreateWithoutEmotionN2Input = {
    id?: string
    notePersonnelle?: string | null
    dateEnregistrement?: Date | string
    utilisateur: UserCreateNestedOneWithoutJournalEmotionsInput
  }

  export type JournalEmotionUncheckedCreateWithoutEmotionN2Input = {
    id?: string
    notePersonnelle?: string | null
    dateEnregistrement?: Date | string
    utilisateurId: string
  }

  export type JournalEmotionCreateOrConnectWithoutEmotionN2Input = {
    where: JournalEmotionWhereUniqueInput
    create: XOR<JournalEmotionCreateWithoutEmotionN2Input, JournalEmotionUncheckedCreateWithoutEmotionN2Input>
  }

  export type JournalEmotionCreateManyEmotionN2InputEnvelope = {
    data: JournalEmotionCreateManyEmotionN2Input | JournalEmotionCreateManyEmotionN2Input[]
    skipDuplicates?: boolean
  }

  export type EmotionNiveau1UpsertWithoutEmotionsN2Input = {
    update: XOR<EmotionNiveau1UpdateWithoutEmotionsN2Input, EmotionNiveau1UncheckedUpdateWithoutEmotionsN2Input>
    create: XOR<EmotionNiveau1CreateWithoutEmotionsN2Input, EmotionNiveau1UncheckedCreateWithoutEmotionsN2Input>
    where?: EmotionNiveau1WhereInput
  }

  export type EmotionNiveau1UpdateToOneWithWhereWithoutEmotionsN2Input = {
    where?: EmotionNiveau1WhereInput
    data: XOR<EmotionNiveau1UpdateWithoutEmotionsN2Input, EmotionNiveau1UncheckedUpdateWithoutEmotionsN2Input>
  }

  export type EmotionNiveau1UpdateWithoutEmotionsN2Input = {
    id?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
  }

  export type EmotionNiveau1UncheckedUpdateWithoutEmotionsN2Input = {
    id?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
  }

  export type JournalEmotionUpsertWithWhereUniqueWithoutEmotionN2Input = {
    where: JournalEmotionWhereUniqueInput
    update: XOR<JournalEmotionUpdateWithoutEmotionN2Input, JournalEmotionUncheckedUpdateWithoutEmotionN2Input>
    create: XOR<JournalEmotionCreateWithoutEmotionN2Input, JournalEmotionUncheckedCreateWithoutEmotionN2Input>
  }

  export type JournalEmotionUpdateWithWhereUniqueWithoutEmotionN2Input = {
    where: JournalEmotionWhereUniqueInput
    data: XOR<JournalEmotionUpdateWithoutEmotionN2Input, JournalEmotionUncheckedUpdateWithoutEmotionN2Input>
  }

  export type JournalEmotionUpdateManyWithWhereWithoutEmotionN2Input = {
    where: JournalEmotionScalarWhereInput
    data: XOR<JournalEmotionUpdateManyMutationInput, JournalEmotionUncheckedUpdateManyWithoutEmotionN2Input>
  }

  export type UserCreateWithoutJournalEmotionsInput = {
    id?: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    firstName: string
    lastName: string
    age?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.Role
    isActif?: boolean
    dateConsentement?: Date | string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    pagesRedigees?: PageInfoCreateNestedManyWithoutAuteurInput
    resultatsDiagnostic?: ResultatDiagnosticCreateNestedManyWithoutUtilisateurInput
    supportTickets?: SupportTicketCreateNestedManyWithoutUtilisateurInput
  }

  export type UserUncheckedCreateWithoutJournalEmotionsInput = {
    id?: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    firstName: string
    lastName: string
    age?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.Role
    isActif?: boolean
    dateConsentement?: Date | string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    pagesRedigees?: PageInfoUncheckedCreateNestedManyWithoutAuteurInput
    resultatsDiagnostic?: ResultatDiagnosticUncheckedCreateNestedManyWithoutUtilisateurInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutUtilisateurInput
  }

  export type UserCreateOrConnectWithoutJournalEmotionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutJournalEmotionsInput, UserUncheckedCreateWithoutJournalEmotionsInput>
  }

  export type EmotionNiveau2CreateWithoutJournauxInput = {
    id?: string
    libelle: string
    emotionN1: EmotionNiveau1CreateNestedOneWithoutEmotionsN2Input
  }

  export type EmotionNiveau2UncheckedCreateWithoutJournauxInput = {
    id?: string
    libelle: string
    emotionN1Id: string
  }

  export type EmotionNiveau2CreateOrConnectWithoutJournauxInput = {
    where: EmotionNiveau2WhereUniqueInput
    create: XOR<EmotionNiveau2CreateWithoutJournauxInput, EmotionNiveau2UncheckedCreateWithoutJournauxInput>
  }

  export type UserUpsertWithoutJournalEmotionsInput = {
    update: XOR<UserUpdateWithoutJournalEmotionsInput, UserUncheckedUpdateWithoutJournalEmotionsInput>
    create: XOR<UserCreateWithoutJournalEmotionsInput, UserUncheckedCreateWithoutJournalEmotionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutJournalEmotionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutJournalEmotionsInput, UserUncheckedUpdateWithoutJournalEmotionsInput>
  }

  export type UserUpdateWithoutJournalEmotionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActif?: BoolFieldUpdateOperationsInput | boolean
    dateConsentement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    pagesRedigees?: PageInfoUpdateManyWithoutAuteurNestedInput
    resultatsDiagnostic?: ResultatDiagnosticUpdateManyWithoutUtilisateurNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutUtilisateurNestedInput
  }

  export type UserUncheckedUpdateWithoutJournalEmotionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActif?: BoolFieldUpdateOperationsInput | boolean
    dateConsentement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    pagesRedigees?: PageInfoUncheckedUpdateManyWithoutAuteurNestedInput
    resultatsDiagnostic?: ResultatDiagnosticUncheckedUpdateManyWithoutUtilisateurNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutUtilisateurNestedInput
  }

  export type EmotionNiveau2UpsertWithoutJournauxInput = {
    update: XOR<EmotionNiveau2UpdateWithoutJournauxInput, EmotionNiveau2UncheckedUpdateWithoutJournauxInput>
    create: XOR<EmotionNiveau2CreateWithoutJournauxInput, EmotionNiveau2UncheckedCreateWithoutJournauxInput>
    where?: EmotionNiveau2WhereInput
  }

  export type EmotionNiveau2UpdateToOneWithWhereWithoutJournauxInput = {
    where?: EmotionNiveau2WhereInput
    data: XOR<EmotionNiveau2UpdateWithoutJournauxInput, EmotionNiveau2UncheckedUpdateWithoutJournauxInput>
  }

  export type EmotionNiveau2UpdateWithoutJournauxInput = {
    id?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
    emotionN1?: EmotionNiveau1UpdateOneRequiredWithoutEmotionsN2NestedInput
  }

  export type EmotionNiveau2UncheckedUpdateWithoutJournauxInput = {
    id?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
    emotionN1Id?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateWithoutSupportTicketsInput = {
    id?: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    firstName: string
    lastName: string
    age?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.Role
    isActif?: boolean
    dateConsentement?: Date | string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    pagesRedigees?: PageInfoCreateNestedManyWithoutAuteurInput
    resultatsDiagnostic?: ResultatDiagnosticCreateNestedManyWithoutUtilisateurInput
    journalEmotions?: JournalEmotionCreateNestedManyWithoutUtilisateurInput
  }

  export type UserUncheckedCreateWithoutSupportTicketsInput = {
    id?: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    firstName: string
    lastName: string
    age?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: $Enums.Role
    isActif?: boolean
    dateConsentement?: Date | string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    pagesRedigees?: PageInfoUncheckedCreateNestedManyWithoutAuteurInput
    resultatsDiagnostic?: ResultatDiagnosticUncheckedCreateNestedManyWithoutUtilisateurInput
    journalEmotions?: JournalEmotionUncheckedCreateNestedManyWithoutUtilisateurInput
  }

  export type UserCreateOrConnectWithoutSupportTicketsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSupportTicketsInput, UserUncheckedCreateWithoutSupportTicketsInput>
  }

  export type UserUpsertWithoutSupportTicketsInput = {
    update: XOR<UserUpdateWithoutSupportTicketsInput, UserUncheckedUpdateWithoutSupportTicketsInput>
    create: XOR<UserCreateWithoutSupportTicketsInput, UserUncheckedCreateWithoutSupportTicketsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSupportTicketsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSupportTicketsInput, UserUncheckedUpdateWithoutSupportTicketsInput>
  }

  export type UserUpdateWithoutSupportTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActif?: BoolFieldUpdateOperationsInput | boolean
    dateConsentement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    pagesRedigees?: PageInfoUpdateManyWithoutAuteurNestedInput
    resultatsDiagnostic?: ResultatDiagnosticUpdateManyWithoutUtilisateurNestedInput
    journalEmotions?: JournalEmotionUpdateManyWithoutUtilisateurNestedInput
  }

  export type UserUncheckedUpdateWithoutSupportTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActif?: BoolFieldUpdateOperationsInput | boolean
    dateConsentement?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    pagesRedigees?: PageInfoUncheckedUpdateManyWithoutAuteurNestedInput
    resultatsDiagnostic?: ResultatDiagnosticUncheckedUpdateManyWithoutUtilisateurNestedInput
    journalEmotions?: JournalEmotionUncheckedUpdateManyWithoutUtilisateurNestedInput
  }

  export type SessionCreateManyUserInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type AccountCreateManyUserInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageInfoCreateManyAuteurInput = {
    id?: string
    titre: string
    slug: string
    contenu: string
    dateCreation?: Date | string
    dateMaj?: Date | string
    isPublie?: boolean
  }

  export type ResultatDiagnosticCreateManyUtilisateurInput = {
    id?: string
    dateEvaluation?: Date | string
    scoreTotal: number
    niveauStress: string
  }

  export type JournalEmotionCreateManyUtilisateurInput = {
    id?: string
    notePersonnelle?: string | null
    dateEnregistrement?: Date | string
    emotionN2Id: string
  }

  export type SupportTicketCreateManyUtilisateurInput = {
    id?: string
    glpiTicketId: number
    category: $Enums.SupportCategory
    subject: string
    statusCode?: number
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageInfoUpdateWithoutAuteurInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateMaj?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublie?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PageInfoUncheckedUpdateWithoutAuteurInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateMaj?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublie?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PageInfoUncheckedUpdateManyWithoutAuteurInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    dateCreation?: DateTimeFieldUpdateOperationsInput | Date | string
    dateMaj?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublie?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ResultatDiagnosticUpdateWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateEvaluation?: DateTimeFieldUpdateOperationsInput | Date | string
    scoreTotal?: IntFieldUpdateOperationsInput | number
    niveauStress?: StringFieldUpdateOperationsInput | string
    reponses?: ReponseDiagnosticUpdateManyWithoutResultatNestedInput
  }

  export type ResultatDiagnosticUncheckedUpdateWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateEvaluation?: DateTimeFieldUpdateOperationsInput | Date | string
    scoreTotal?: IntFieldUpdateOperationsInput | number
    niveauStress?: StringFieldUpdateOperationsInput | string
    reponses?: ReponseDiagnosticUncheckedUpdateManyWithoutResultatNestedInput
  }

  export type ResultatDiagnosticUncheckedUpdateManyWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateEvaluation?: DateTimeFieldUpdateOperationsInput | Date | string
    scoreTotal?: IntFieldUpdateOperationsInput | number
    niveauStress?: StringFieldUpdateOperationsInput | string
  }

  export type JournalEmotionUpdateWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    notePersonnelle?: NullableStringFieldUpdateOperationsInput | string | null
    dateEnregistrement?: DateTimeFieldUpdateOperationsInput | Date | string
    emotionN2?: EmotionNiveau2UpdateOneRequiredWithoutJournauxNestedInput
  }

  export type JournalEmotionUncheckedUpdateWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    notePersonnelle?: NullableStringFieldUpdateOperationsInput | string | null
    dateEnregistrement?: DateTimeFieldUpdateOperationsInput | Date | string
    emotionN2Id?: StringFieldUpdateOperationsInput | string
  }

  export type JournalEmotionUncheckedUpdateManyWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    notePersonnelle?: NullableStringFieldUpdateOperationsInput | string | null
    dateEnregistrement?: DateTimeFieldUpdateOperationsInput | Date | string
    emotionN2Id?: StringFieldUpdateOperationsInput | string
  }

  export type SupportTicketUpdateWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    glpiTicketId?: IntFieldUpdateOperationsInput | number
    category?: EnumSupportCategoryFieldUpdateOperationsInput | $Enums.SupportCategory
    subject?: StringFieldUpdateOperationsInput | string
    statusCode?: IntFieldUpdateOperationsInput | number
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportTicketUncheckedUpdateWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    glpiTicketId?: IntFieldUpdateOperationsInput | number
    category?: EnumSupportCategoryFieldUpdateOperationsInput | $Enums.SupportCategory
    subject?: StringFieldUpdateOperationsInput | string
    statusCode?: IntFieldUpdateOperationsInput | number
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportTicketUncheckedUpdateManyWithoutUtilisateurInput = {
    id?: StringFieldUpdateOperationsInput | string
    glpiTicketId?: IntFieldUpdateOperationsInput | number
    category?: EnumSupportCategoryFieldUpdateOperationsInput | $Enums.SupportCategory
    subject?: StringFieldUpdateOperationsInput | string
    statusCode?: IntFieldUpdateOperationsInput | number
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReponseDiagnosticCreateManyEvenementInput = {
    resultatId: string
  }

  export type ReponseDiagnosticUpdateWithoutEvenementInput = {
    resultat?: ResultatDiagnosticUpdateOneRequiredWithoutReponsesNestedInput
  }

  export type ReponseDiagnosticUncheckedUpdateWithoutEvenementInput = {
    resultatId?: StringFieldUpdateOperationsInput | string
  }

  export type ReponseDiagnosticUncheckedUpdateManyWithoutEvenementInput = {
    resultatId?: StringFieldUpdateOperationsInput | string
  }

  export type ReponseDiagnosticCreateManyResultatInput = {
    evenementId: string
  }

  export type ReponseDiagnosticUpdateWithoutResultatInput = {
    evenement?: EvenementStressUpdateOneRequiredWithoutReponsesNestedInput
  }

  export type ReponseDiagnosticUncheckedUpdateWithoutResultatInput = {
    evenementId?: StringFieldUpdateOperationsInput | string
  }

  export type ReponseDiagnosticUncheckedUpdateManyWithoutResultatInput = {
    evenementId?: StringFieldUpdateOperationsInput | string
  }

  export type EmotionNiveau2CreateManyEmotionN1Input = {
    id?: string
    libelle: string
  }

  export type EmotionNiveau2UpdateWithoutEmotionN1Input = {
    id?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
    journaux?: JournalEmotionUpdateManyWithoutEmotionN2NestedInput
  }

  export type EmotionNiveau2UncheckedUpdateWithoutEmotionN1Input = {
    id?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
    journaux?: JournalEmotionUncheckedUpdateManyWithoutEmotionN2NestedInput
  }

  export type EmotionNiveau2UncheckedUpdateManyWithoutEmotionN1Input = {
    id?: StringFieldUpdateOperationsInput | string
    libelle?: StringFieldUpdateOperationsInput | string
  }

  export type JournalEmotionCreateManyEmotionN2Input = {
    id?: string
    notePersonnelle?: string | null
    dateEnregistrement?: Date | string
    utilisateurId: string
  }

  export type JournalEmotionUpdateWithoutEmotionN2Input = {
    id?: StringFieldUpdateOperationsInput | string
    notePersonnelle?: NullableStringFieldUpdateOperationsInput | string | null
    dateEnregistrement?: DateTimeFieldUpdateOperationsInput | Date | string
    utilisateur?: UserUpdateOneRequiredWithoutJournalEmotionsNestedInput
  }

  export type JournalEmotionUncheckedUpdateWithoutEmotionN2Input = {
    id?: StringFieldUpdateOperationsInput | string
    notePersonnelle?: NullableStringFieldUpdateOperationsInput | string | null
    dateEnregistrement?: DateTimeFieldUpdateOperationsInput | Date | string
    utilisateurId?: StringFieldUpdateOperationsInput | string
  }

  export type JournalEmotionUncheckedUpdateManyWithoutEmotionN2Input = {
    id?: StringFieldUpdateOperationsInput | string
    notePersonnelle?: NullableStringFieldUpdateOperationsInput | string | null
    dateEnregistrement?: DateTimeFieldUpdateOperationsInput | Date | string
    utilisateurId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}