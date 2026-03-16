export function SettingsPage() {
  return (
    <section className="sdm-page">
      <header className="sdm-page-header">
        <h1>Settings</h1>
        <p>Manage your profile, notifications and appearance.</p>
      </header>

      <div className="sdm-grid sdm-grid-1col">
        <div className="sdm-card sdm-settings-card">
          <h3>Profile</h3>
          <div className="sdm-form-grid">
            <label>
              <span>Display name</span>
              <input placeholder="Your name" />
            </label>
            <label>
              <span>Email</span>
              <input placeholder="you@example.com" />
            </label>
          </div>
        </div>

        <div className="sdm-card sdm-settings-card">
          <h3>Notifications</h3>
          <div className="sdm-toggle-row">
            <span>New breakthroughs</span>
            <button className="sdm-toggle sdm-toggle-on">
              <span />
            </button>
          </div>
          <div className="sdm-toggle-row">
            <span>Followed topic updates</span>
            <button className="sdm-toggle sdm-toggle-on">
              <span />
            </button>
          </div>
          <div className="sdm-toggle-row">
            <span>Weekly digest</span>
            <button className="sdm-toggle sdm-toggle-on">
              <span />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

