// Based on type-fest
// https://github.com/sindresorhus/type-fest/blob/main/source/tagged.d.ts
declare const tag: unique symbol;

export type TagContainer<Token> = {
    readonly [tag]: Token;
};

type Tag<Token extends PropertyKey, TagMetadata> = TagContainer<Record<Token, TagMetadata>>;

export type Tagged<Type, TagName extends PropertyKey, TagMetadata = never> = Type & Tag<TagName, TagMetadata>;
