import * as Popover from "@radix-ui/react-popover";
import { getRouteApi } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { ORGANIZATIONS, STATUSES } from "../data";

const routeApi = getRouteApi("/_protected/users/");

interface FilterFormProps {
  trigger: React.ReactNode;
}

interface FilterFormValues {
  org: string;
  username: string;
  email: string;
  phone: string;
  status: string;
  date: string;
}

export function FilterForm({
  trigger,
  isPending,
}: FilterFormProps & { isPending?: boolean }) {
  const navigate = routeApi.useNavigate();
  const search = routeApi.useSearch();

  const { register, handleSubmit, reset } = useForm<FilterFormValues>({
    defaultValues: {
      org: search.org || "",
      username: search.search || "",
      email: "",
      phone: "",
      status: search.status || "",
      date: "",
    },
  });

  const onSubmit = (data: FilterFormValues) => {
    // We map multiple inputs to our generic 'search' param for simplicity in this mock
    // In a real app, we'd have specific params for each.
    const searchValue = data.username || data.email || data.phone;

    navigate({
      search: (prev: Record<string, unknown>) => ({
        ...prev,
        page: 1, // Reset to page 1
        org: data.org || undefined,
        status:
          (data.status as "Active" | "Inactive" | "Pending" | "Blacklisted") ||
          undefined,
        search: searchValue || undefined,
      }),
    });
  };

  const onReset = () => {
    reset();
    navigate({
      search: (prev: Record<string, unknown>) => ({
        ...prev,
        page: 1,
        org: undefined,
        status: undefined,
        search: undefined,
      }),
    });
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="users-page__filter-form"
          sideOffset={5}
          align="start"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="users-page__form-group">
              <label htmlFor="org" className="users-page__label">
                Organization
              </label>
              <select
                id="org"
                className="users-page__select"
                {...register("org")}
              >
                <option value="">Select</option>
                {ORGANIZATIONS.map((org) => (
                  <option key={org} value={org}>
                    {org}
                  </option>
                ))}
              </select>
            </div>

            <div className="users-page__form-group">
              <label htmlFor="username" className="users-page__label">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="User"
                className="users-page__input"
                {...register("username")}
              />
            </div>

            <div className="users-page__form-group">
              <label htmlFor="email" className="users-page__label">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="users-page__input"
                {...register("email")}
              />
            </div>

            <div className="users-page__form-group">
              <label htmlFor="date" className="users-page__label">
                Date
              </label>
              <input
                id="date"
                type="date"
                placeholder="Date"
                className="users-page__input"
                {...register("date")}
              />
            </div>

            <div className="users-page__form-group">
              <label htmlFor="phone" className="users-page__label">
                Phone Number
              </label>
              <input
                id="phone"
                type="text"
                placeholder="Phone Number"
                className="users-page__input"
                {...register("phone")}
              />
            </div>

            <div className="users-page__form-group">
              <label htmlFor="status" className="users-page__label">
                Status
              </label>
              <select
                id="status"
                className="users-page__select"
                {...register("status")}
              >
                <option value="">Select</option>
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="users-page__actions">
              <button
                type="button"
                onClick={onReset}
                className="users-page__btn-reset"
                disabled={isPending}
              >
                Reset
              </button>
              <button
                type="submit"
                className="users-page__btn-filter"
                disabled={isPending}
              >
                Filter
              </button>
            </div>
          </form>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
