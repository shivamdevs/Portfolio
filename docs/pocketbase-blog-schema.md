# PocketBase Blog Schema (Multi-User)

This document defines the PocketBase collections, fields, indexes, and API rule recommendations needed by the portfolio blog implementation.

## Goals

- Multi-user blog support.
- Strict post state: only `draft` or `published`.
- No post deletion behavior in application code.
- Edit rights: author OR one of roles `owner`, `admin`, `manager`.
- Engagement: comments + likes/upvotes.

## Existing Prerequisite

Your `users` collection already needs a `role` field with these values:

- `owner`
- `admin`
- `manager`
- `user`

If `role` does not exist in PocketBase yet, add it as a `select` field with exactly the values above.

## Collection: blog_posts

### Fields

1. `title`
- Type: `text`
- Required: yes
- Min length: 3
- Max length: 180

2. `slug`
- Type: `text`
- Required: yes
- Min length: 3
- Max length: 180
- Recommended format: lowercase kebab-case

3. `excerpt`
- Type: `text`
- Required: yes
- Min length: 12
- Max length: 320

4. `content`
- Type: `editor` or `text`
- Required: yes
- Min length: 50

5. `state`
- Type: `select`
- Required: yes
- Allowed values: `draft`, `published`
- Default: `draft`

6. `author`
- Type: `relation`
- Collection: `users`
- Max select: 1
- Required: yes

7. `published`
- Type: `date`
- Required: no
- Null for drafts, set when published

8. `featured`
- Type: `bool`
- Required: no

9. `cover`
- Type: `file`
- Required: no

10. `readingMinutes`
- Type: `number`
- Required: no

11. `updatedBy`
- Type: `relation` (`users`)
- Required: no

12. `lastModeratedBy`
- Type: `relation` (`users`)
- Required: no

### Indexes

1. Unique per author slug:
- `(author, slug)` unique

2. Feed index:
- `(state, published)`

3. Author timeline index:
- `(author, created)`

### API Rules (recommended)

Use PocketBase rules + server checks together.

- List rule:
```
state = "published" || author.id = @request.auth.id || @request.auth.role = "owner" || @request.auth.role = "admin" || @request.auth.role = "manager"
```

- View rule:
```
state = "published" || author.id = @request.auth.id || @request.auth.role = "owner" || @request.auth.role = "admin" || @request.auth.role = "manager"
```

- Create rule:
```
@request.auth.id != ""
```

- Update rule:
```
author.id = @request.auth.id || @request.auth.role = "owner" || @request.auth.role = "admin" || @request.auth.role = "manager"
```

- Delete rule:
```
false
```

Delete is intentionally blocked to match the non-deletion policy.

## Collection: blog_comments

### Fields

1. `post`
- Type: `relation`
- Collection: `blog_posts`
- Max select: 1
- Required: yes

2. `author`
- Type: `relation`
- Collection: `users`
- Max select: 1
- Required: yes

3. `content`
- Type: `text`
- Required: yes
- Min length: 1
- Max length: 4000

4. `replied`
- Type: `relation` (`blog_comments`)
- Required: no
- Use for threaded replies

### Indexes

1. `(post, created)`
2. `(author, created)`

### API Rules (recommended)

- List rule:
```
post.state = "published" || post.author.id = @request.auth.id || @request.auth.role = "owner" || @request.auth.role = "admin" || @request.auth.role = "manager"
```

- View rule:
```
post.state = "published" || post.author.id = @request.auth.id || @request.auth.role = "owner" || @request.auth.role = "admin" || @request.auth.role = "manager"
```

- Create rule:
```
@request.auth.id != "" && post.state = "published"
```

- Update rule:
```
author.id = @request.auth.id || @request.auth.role = "owner" || @request.auth.role = "admin" || @request.auth.role = "manager"
```

- Delete rule:
```
false
```

## Collection: blog_likes

Like/unlike is implemented as an `active` toggle to avoid delete operations.

### Fields

1. `post`
- Type: `relation`
- Collection: `blog_posts`
- Max select: 1
- Required: yes

2. `user`
- Type: `relation`
- Collection: `users`
- Max select: 1
- Required: yes

3. `active`
- Type: `bool`
- Required: yes
- Default: true

### Indexes

1. Unique user/post pair:
- `(post, user)` unique

2. Active count index:
- `(post, active)`

### API Rules (recommended)

- List rule:
```
post.state = "published"
```

- View rule:
```
post.state = "published"
```

- Create rule:
```
@request.auth.id != "" && post.state = "published" && user.id = @request.auth.id
```

- Update rule:
```
user.id = @request.auth.id
```

- Delete rule:
```
false
```

## Role + Permission Model Used in App

The app enforces edit permissions in TypeScript using `src/lib/auth/roles.ts`:

- Author can edit own post.
- Elevated roles can edit any post: `owner`, `admin`, `manager`.
- `user` cannot edit others' posts.

## State Constraints Used in App

`src/lib/blog/types.ts` restricts post state to:

- `draft`
- `published`

Any value outside these two is rejected by validation.

## Code Mapping Notes

- The app reads/writes post publish date using `published` (not `publishedAt`).
- The app stores `readingMinutes` automatically from post content.
- The app sets `updatedBy` on create/update operations.
- The app does not currently write `lastModeratedBy`; reserve this for moderation workflows.

## Non-Deletion Constraint

- No blog post deletion endpoint exists in the app.
- PocketBase `blog_posts` delete rule is set to `false`.
- Likes are toggled via `active` (no delete).
- Recommended: keep delete rules disabled for all blog collections.

## Optional Admin Enhancements

1. Add `featured` boolean on `blog_posts` for homepage/blog pinning.
2. Add `readingMinutes` number for quick UI rendering.
3. Add `coverImage` file/url for richer OG images.
4. Add audit fields (`updatedBy`, `lastModeratedBy`) if you plan moderation workflows.
