import {
  anonymizeManagedUser,
  createManagedUser,
  toggleManagedUserStatus,
  updateManagedUserRole,
} from "@/app/admin/actions";
import { requireAdminPage } from "@/server/admin";
import { db } from "@/server/db";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

const fieldClass =
  "h-10 w-full min-w-0 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30";

const smallButtonClass =
  "h-9 rounded-lg border border-border px-3 text-xs font-bold text-foreground transition-colors hover:bg-secondary disabled:opacity-60";

const dangerButtonClass =
  "h-9 rounded-lg bg-destructive/10 px-3 text-xs font-bold text-destructive transition-colors hover:bg-destructive/20 disabled:opacity-60";

export default async function AdminUsersPage() {
  const currentAdmin = await requireAdminPage();
  const users = await db.user.findMany({
    orderBy: [{ role: "desc" }, { createdAt: "desc" }],
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActif: true,
      firstName: true,
      lastName: true,
      age: true,
      createdAt: true,
    },
  });

  return (
    <div className="space-y-6 lg:space-y-8">
      <header className="min-w-0">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">
          Comptes utilisateurs
        </p>
        <h1 className="mt-2 font-heading text-2xl font-bold text-foreground sm:text-3xl">
          Gestion des utilisateurs et administrateurs
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Les suppressions sont traitees par anonymisation et desactivation du
          compte, afin de respecter le principe RGPD de minimisation des donnees.
        </p>
      </header>

      <section className="rounded-lg border border-border bg-card p-4 sm:p-5">
        <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">
          Creer un compte
        </h2>
        <form
          action={createManagedUser}
          className="mt-5 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6"
        >
          <label className="grid min-w-0 gap-2 text-sm font-semibold text-foreground">
            Prenom
            <input name="firstName" required className={fieldClass} />
          </label>
          <label className="grid min-w-0 gap-2 text-sm font-semibold text-foreground">
            Nom
            <input name="lastName" required className={fieldClass} />
          </label>
          <label className="grid min-w-0 gap-2 text-sm font-semibold text-foreground sm:col-span-2 xl:col-span-2">
            Email
            <input name="email" type="email" required className={fieldClass} />
          </label>
          <label className="grid min-w-0 gap-2 text-sm font-semibold text-foreground">
            Age
            <input name="age" type="number" min="13" className={fieldClass} />
          </label>
          <label className="grid min-w-0 gap-2 text-sm font-semibold text-foreground">
            Role
            <select name="role" defaultValue="USER" className={fieldClass}>
              <option value="USER">Utilisateur</option>
              <option value="ADMIN">Administrateur</option>
            </select>
          </label>
          <label className="grid min-w-0 gap-2 text-sm font-semibold text-foreground sm:col-span-2 xl:col-span-2">
            Mot de passe initial
            <input
              name="password"
              type="password"
              required
              minLength={8}
              className={fieldClass}
            />
          </label>
          <div className="flex min-w-0 items-end sm:col-span-2 xl:col-span-4">
            <button className="h-10 w-full rounded-lg bg-brand px-4 text-sm font-bold text-white transition-colors hover:bg-brand-dark sm:w-auto">
              Creer le compte
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-lg border border-border bg-card">
        <div className="border-b border-border p-4 sm:p-5">
          <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">
            Comptes existants
          </h2>
        </div>

        <div className="grid gap-3 p-3 lg:hidden">
          {users.map((user) => {
            const isCurrentAdmin = user.id === currentAdmin.id;

            return (
              <article
                key={user.id}
                className="min-w-0 rounded-lg border border-border bg-background p-4"
              >
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-foreground">
                      {user.name}
                    </p>
                    <p className="break-all text-sm text-muted-foreground">
                      {user.email}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {user.firstName} {user.lastName}
                      {user.age !== null ? `, ${user.age} ans` : ""}
                    </p>
                  </div>
                  <span
                    className={
                      user.isActif
                        ? "shrink-0 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700"
                        : "shrink-0 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700"
                    }
                  >
                    {user.isActif ? "Actif" : "Desactive"}
                  </span>
                </div>

                <div className="mt-4 grid gap-3">
                  <form action={updateManagedUserRole} className="grid gap-2">
                    <input type="hidden" name="userId" value={user.id} />
                    <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                      Role
                    </label>
                    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-2">
                      <select
                        name="role"
                        defaultValue={user.role}
                        disabled={isCurrentAdmin}
                        className={`${fieldClass} disabled:opacity-60`}
                      >
                        <option value="USER">Utilisateur</option>
                        <option value="ADMIN">Administrateur</option>
                      </select>
                      <button disabled={isCurrentAdmin} className={smallButtonClass}>
                        Valider
                      </button>
                    </div>
                  </form>

                  <div className="grid grid-cols-2 gap-2">
                    <form action={toggleManagedUserStatus}>
                      <input type="hidden" name="userId" value={user.id} />
                      <input
                        type="hidden"
                        name="isActif"
                        value={user.isActif ? "false" : "true"}
                      />
                      <button
                        disabled={isCurrentAdmin}
                        className={`${smallButtonClass} w-full`}
                      >
                        {user.isActif ? "Desactiver" : "Reactiver"}
                      </button>
                    </form>
                    <form action={anonymizeManagedUser}>
                      <input type="hidden" name="userId" value={user.id} />
                      <button
                        disabled={isCurrentAdmin}
                        className={`${dangerButtonClass} w-full`}
                      >
                        Anonymiser
                      </button>
                    </form>
                  </div>
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  Cree le {formatDate(user.createdAt)}
                </p>
              </article>
            );
          })}
          {users.length === 0 && (
            <p className="p-2 text-sm text-muted-foreground">
              Aucun compte utilisateur.
            </p>
          )}
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[860px] table-fixed text-left text-sm">
            <thead className="bg-secondary text-xs uppercase text-muted-foreground">
              <tr>
                <th className="w-[34%] px-4 py-3">Utilisateur</th>
                <th className="w-[24%] px-4 py-3">Role</th>
                <th className="w-[12%] px-4 py-3">Statut</th>
                <th className="w-[12%] px-4 py-3">Creation</th>
                <th className="w-[18%] px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => {
                const isCurrentAdmin = user.id === currentAdmin.id;

                return (
                  <tr key={user.id} className="align-top">
                    <td className="min-w-0 px-4 py-4">
                      <p className="truncate font-semibold text-foreground">
                        {user.name}
                      </p>
                      <p className="break-all text-muted-foreground">{user.email}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {user.firstName} {user.lastName}
                        {user.age !== null ? `, ${user.age} ans` : ""}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <form
                        action={updateManagedUserRole}
                        className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-2"
                      >
                        <input type="hidden" name="userId" value={user.id} />
                        <select
                          name="role"
                          defaultValue={user.role}
                          disabled={isCurrentAdmin}
                          className={`${fieldClass} h-9 px-2 disabled:opacity-60`}
                        >
                          <option value="USER">Utilisateur</option>
                          <option value="ADMIN">Administrateur</option>
                        </select>
                        <button disabled={isCurrentAdmin} className={smallButtonClass}>
                          Valider
                        </button>
                      </form>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={
                          user.isActif
                            ? "rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700"
                            : "rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700"
                        }
                      >
                        {user.isActif ? "Actif" : "Desactive"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <form action={toggleManagedUserStatus}>
                          <input type="hidden" name="userId" value={user.id} />
                          <input
                            type="hidden"
                            name="isActif"
                            value={user.isActif ? "false" : "true"}
                          />
                          <button
                            disabled={isCurrentAdmin}
                            className={smallButtonClass}
                          >
                            {user.isActif ? "Desactiver" : "Reactiver"}
                          </button>
                        </form>
                        <form action={anonymizeManagedUser}>
                          <input type="hidden" name="userId" value={user.id} />
                          <button
                            disabled={isCurrentAdmin}
                            className={dangerButtonClass}
                          >
                            Anonymiser
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
