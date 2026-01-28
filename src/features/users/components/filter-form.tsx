import * as Popover from "@radix-ui/react-popover";
import { getRouteApi } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

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

export function FilterForm({ trigger }: FilterFormProps) {
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
      search: (prev: any) => ({
        ...prev,
        page: 1, // Reset to page 1
        org: data.org || undefined,
        status: data.status || undefined,
        search: searchValue || undefined,
      }),
    });
  };

  const onReset = () => {
    reset();
    navigate({
      search: (prev: any) => ({
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
              <label className="users-page__label">Organization</label>
              <select className="users-page__select" {...register("org")}>
                <option value="">Select</option>
                <option value="Lendsqr">Lendsqr</option>
                <option value="Irorun">Irorun</option>
                <option value="Lendstar">Lendstar</option>
              </select>
            </div>

            <div className="users-page__form-group">
              <label className="users-page__label">Username</label>
              <input
                type="text"
                placeholder="User"
                className="users-page__input"
                {...register("username")}
              />
            </div>

            <div className="users-page__form-group">
              <label className="users-page__label">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="users-page__input"
                {...register("email")}
              />
            </div>

            <div className="users-page__form-group">
              <label className="users-page__label">Date</label>
              <input
                type="date"
                placeholder="Date"
                className="users-page__input"
                {...register("date")}
              />
            </div>

            <div className="users-page__form-group">
              <label className="users-page__label">Phone Number</label>
              <input
                type="text"
                placeholder="Phone Number"
                className="users-page__input"
                {...register("phone")}
              />
            </div>

            <div className="users-page__form-group">
              <label className="users-page__label">Status</label>
              <select className="users-page__select" {...register("status")}>
                <option value="">Select</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
                <option value="Blacklisted">Blacklisted</option>
              </select>
            </div>

            <div className="users-page__actions">
              <button
                type="button"
                onClick={onReset}
                className="users-page__btn-reset"
              >
                Reset
              </button>
              <button type="submit" className="users-page__btn-filter">
                Filter
              </button>
            </div>
          </form>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
