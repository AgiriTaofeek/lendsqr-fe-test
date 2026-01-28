import * as Popover from "@radix-ui/react-popover";

interface FilterFormProps {
  trigger: React.ReactNode;
}

export function FilterForm({ trigger }: FilterFormProps) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="users-page__filter-form" sideOffset={5}>
          <div className="users-page__form-group">
            <label className="users-page__label">Organization</label>
            <select className="users-page__select">
              <option value="">Select</option>
              <option value="lendsqr">Lendsqr</option>
              <option value="irorun">Irorun</option>
            </select>
          </div>

          <div className="users-page__form-group">
            <label className="users-page__label">Username</label>
            <input
              type="text"
              placeholder="User"
              className="users-page__input"
            />
          </div>

          <div className="users-page__form-group">
            <label className="users-page__label">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="users-page__input"
            />
          </div>

          <div className="users-page__form-group">
            <label className="users-page__label">Date</label>
            <input
              type="date"
              placeholder="Date"
              className="users-page__input"
            />
          </div>

          <div className="users-page__form-group">
            <label className="users-page__label">Phone Number</label>
            <input
              type="text"
              placeholder="Phone Number"
              className="users-page__input"
            />
          </div>

          <div className="users-page__form-group">
            <label className="users-page__label">Status</label>
            <select className="users-page__select">
              <option value="">Select</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
              <option value="blacklisted">Blacklisted</option>
            </select>
          </div>

          <div className="users-page__actions">
            <button className="users-page__btn-reset">Reset</button>
            <button className="users-page__btn-filter">Filter</button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
