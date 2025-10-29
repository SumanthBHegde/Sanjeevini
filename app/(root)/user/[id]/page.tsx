import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import UserPlants from "@/components/UserPlants";
import { Suspense } from "react";
import { PlantCardSkeleton } from "@/components/plants/PlantCard";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import UserAvatar from "@/components/ui/user-avatar";

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(
    `*[_type == "author" && _id == $id][0]{
      _id,
      name,
      username,
      email,
      bio,
      image,
      expertise,
      role,
      isAdmin,
      pendingEditorRequest,
      editorRequestDate,
      editorApprovedDate,
      createdAt
    }`,
    { id }
  );

  if (!user) return notFound();

  // Check if current user is the profile owner or an admin
  const isOwner = session?.user?.id === id;
  const isAdmin = session?.user?.role === 'admin' || session?.user?.isAdmin === true;
  const isEditor = user.role === 'editor';

  // Format joined date if available
  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    })
    : null;

  // Format editor approved date if available
  const editorApprovedDate = user.editorApprovedDate
    ? new Date(user.editorApprovedDate).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
    : null;

  return (
    <>
      <section className="bg-[var(--color-home)] py-12">
        <div className="max-w-7xl mx-auto px-4 lg:flex gap-8">
          {/* Profile Sidebar */}
          <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md border border-[var(--color-card-stroke-primary)] p-6 mb-6 lg:mb-0">
            {/* Role Badges */}
            <div className="flex justify-end mb-2 gap-2">
              {user.role === 'admin' || user.isAdmin ? (
                <Badge variant="default" className="text-xs bg-purple-600">
                  Admin
                </Badge>
              ) : user.role === 'editor' ? (
                <Badge variant="default" className="text-xs bg-green-600">
                  Editor
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-xs">
                  Viewer
                </Badge>
              )}

              {user.pendingEditorRequest && (
                <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-800 border-amber-200">
                  Editor Request Pending
                </Badge>
              )}

              {user.expertise && (
                <Badge variant="secondary" className="text-xs">
                  {user.expertise}
                </Badge>
              )}
            </div>

            {/* Profile Header */}
            <div className="text-center mb-6">
              <h2 className="title-secondary mb-1">
                {user.name}
              </h2>
              {joinedDate && (
                <p className="text-sm text-[var(--color-text-body-secondary)]">
                  Joined {joinedDate}
                </p>
              )}
            </div>

            {/* Profile Image */}
            <div className="flex justify-center mb-6">
              <div className="w-48 h-48 relative rounded-full overflow-hidden border-4 border-[var(--color-avatar-card-stroke)]">
                <UserAvatar
                  src={user.image}
                  name={user.name}
                  fallbackText={user.name?.substring(0, 2).toUpperCase()}
                  className="w-full h-full"
                  imgClassName="object-cover"
                />
              </div>
            </div>

            {/* Username */}
            <div className="text-center mb-4">
              <p className="body-heading">@{user?.username}</p>
            </div>

            {/* Bio */}
            <div className="mb-5">
              <p className="body-text-secondary text-center">
                {user?.bio || "No bio provided"}
              </p>
            </div>

            {/* Role Information - Shown to everyone */}
            <div className="mb-6 mt-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-center mb-2">Role & Permissions</h3>

                <div className="flex items-center gap-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={user.role === 'admin' ? "text-purple-600" : user.role === 'editor' ? "text-green-600" : "text-gray-600"}>
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>

                  <span className="text-sm">
                    {user.role === 'admin' ? (
                      <span className="font-medium text-purple-600">Administrator</span>
                    ) : user.role === 'editor' ? (
                      <span className="font-medium text-green-600">Editor</span>
                    ) : (
                      <span className="font-medium">Viewer</span>
                    )}
                  </span>
                </div>

                {isEditor && editorApprovedDate && (
                  <p className="text-xs text-gray-500 mb-2">Editor since {editorApprovedDate}</p>
                )}

                <ul className="text-sm space-y-1 mt-2">
                  {user.role === 'admin' && (
                    <>
                      <li className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        <span>Full administrative access</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        <span>Can manage user roles</span>
                      </li>
                    </>
                  )}

                  {(user.role === 'admin' || user.role === 'editor') && (
                    <>
                      <li className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        <span>Can create and edit plants</span>
                      </li>
                    </>
                  )}

                  <li className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>Can view and interact with content</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Profile Actions - Only shown to profile owner or admin */}
            {(isOwner || isAdmin) && (
              <div className="border-t border-[var(--color-divider-stroke)] pt-5 mt-5">
                <h3 className="title-sm mb-4 text-center">Profile Actions</h3>
                <div className="flex flex-col gap-3">
                  {isOwner && (
                    <>
                      <Link href="/profile/edit" className="submit_button text-center py-2">
                        Edit Profile
                      </Link>

                      {user.role === 'viewer' && !user.pendingEditorRequest && (
                        <Link href="/user/request-editor" className="submit_button text-center py-2 bg-amber-600">
                          Request Editor Role
                        </Link>
                      )}
                    </>
                  )}

                  {isAdmin && !isOwner && (
                    <>
                      <Link href={`/admin/user/${id}`} className="submit_button text-center py-2 bg-amber-600">
                        Manage User
                      </Link>
                      {user.pendingEditorRequest && (
                        <Link href={`/admin/editor-requests`} className="submit_button text-center py-2 bg-green-600">
                          Review Editor Request
                        </Link>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Plants Section */}
          <div className="w-full lg:w-2/3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="body-heading">
                {isOwner ? "Your Plant Contributions" : `${user.name}'s Plant Contributions`}
              </h2>

              {(isOwner && (user.role === 'admin' || user.role === 'editor')) && (
                <Link
                  href="/plant/create"
                  className="btn-primary inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Add New Plant
                </Link>
              )}
            </div>

            <div className="card_grid-sm">
              <Suspense fallback={
                <>
                  <PlantCardSkeleton />
                  <PlantCardSkeleton />
                </>
              }>
                <UserPlants id={id} showAddButton={isOwner && (user.role === 'admin' || user.role === 'editor')} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
