# Firebase + Cloudinary moderation setup

This static site uses Firebase Auth + Firestore for moderation and Cloudinary for image hosting.

## Database structure

Firestore collections:

```text
admins/{uid}
  email: string
  createdAt: timestamp

comments/{commentId}
  name: string
  rating: number
  comment: string
  status: "pending" | "approved" | "rejected"
  createdAt: timestamp
  approvedAt: timestamp | null
  rejectedAt: timestamp | null

photos/{photoId}
  name: string
  caption: string
  imageUrl: string
  publicId: string
  cloudinaryAssetId: string
  width: number | null
  height: number | null
  status: "pending" | "approved" | "rejected"
  createdAt: timestamp
  approvedAt: timestamp | null
  rejectedAt: timestamp | null
```

Cloudinary folder:

```text
only-zs/pending-photos
```

## Firebase console steps

1. Create a Firebase project.
2. Enable Authentication with Email/Password.
3. Create one admin user in Authentication.
4. Copy that user's UID.
5. Create `admins/{UID}` in Firestore. The document can contain:

```json
{
  "email": "admin@example.com",
  "createdAt": "server timestamp"
}
```

6. Enable Firestore Database.
7. Replace the Firebase placeholder values in `firebase-config.js`.
8. Publish `firestore.rules` to Firestore Rules.

## Cloudinary console steps

1. Create a Cloudinary account.
2. Copy your Cloudinary cloud name.
3. Create an unsigned upload preset.
4. Restrict the preset as much as possible:
   - Folder: `only-zs/pending-photos`
   - Resource type: image
   - Max file size: 5 MB if your plan/settings allow it
   - Allowed formats: jpg, jpeg, png, webp
5. Add the cloud name and unsigned preset name to `firebase-config.js`.

## Flow

Public visitors:

- Submit a review from the testimonials section.
- Upload a photo from the gallery section.
- Reviews are saved directly to Firestore with `status: "pending"`.
- Photos upload to Cloudinary first, then the Cloudinary URL/public ID is saved to Firestore with `status: "pending"`.
- Only documents with `status: "approved"` render publicly.

Administrator:

- Visits `/admin/`.
- Signs in through Firebase Authentication.
- Must also have a matching `admins/{uid}` Firestore document.
- Can approve, reject, or delete pending comments and photos.
- Delete removes the Firestore moderation record. Deleting the original Cloudinary asset requires the Cloudinary Media Library or a small serverless endpoint with your Cloudinary API secret.

## Security notes

- No admin password is stored in HTML, CSS, or JavaScript.
- Frontend Firebase config is allowed to be public; security comes from Firebase Authentication plus Firestore rules.
- The static frontend never decides who is admin. Rules enforce admin-only update and delete operations.
- Cloudinary unsigned upload presets are public by nature. Keep the preset restricted and never expose your Cloudinary API secret in frontend code.
- For stronger role management at scale, replace the `admins/{uid}` allowlist with Firebase custom claims set from a trusted server environment.
