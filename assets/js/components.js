'use strict';


const PortfolioComponents = {

  getSidebarHTML() {
    return `
    <!-- #SIDEBAR -->
    <aside class="sidebar" data-sidebar>
      <div class="sidebar-info">
        <figure class="avatar-box">
          <img src="./assets/images/myavatar.jpeg" alt="Maritza Ratnamaya Nugroho" width="80">
        </figure>

        <div class="info-content">
          <h1 class="name" title="Maritza Ratnamaya Nugroho">Maritza Ratnamaya Nugroho</h1>
          <p class="title">Data Analyst</p>
        </div>

        <button class="info_more-btn" data-sidebar-btn>
          <span data-i18n="sidebar-btn">Tampilkan Kontak</span>
          <ion-icon name="chevron-down"></ion-icon>
        </button>
      </div>

      <div class="sidebar-info_more">
        <div class="separator"></div>

        <ul class="contacts-list">
          <li class="contact-item">
            <div class="icon-box">
              <ion-icon name="mail-outline"></ion-icon>
            </div>
            <div class="contact-info">
              <p class="contact-title">Email</p>
              <a href="mailto:maritzaratnaa@gmail.com" class="contact-link">maritzaratnaa@gmail.com</a>
            </div>
          </li>

          <li class="contact-item">
            <div class="icon-box">
              <ion-icon name="phone-portrait-outline"></ion-icon>
            </div>
            <div class="contact-info">
              <p class="contact-title" data-i18n="contact-phone-label">Telepon</p>
              <a href="tel:+6281225077605" class="contact-link">+62 812 2507 7605</a>
            </div>
          </li>

          <li class="contact-item">
            <div class="icon-box">
              <ion-icon name="calendar-outline"></ion-icon>
            </div>
            <div class="contact-info">
              <p class="contact-title" data-i18n="contact-born-label">Lahir</p>
              <time datetime="2005-02-05" data-i18n="contact-born-date">5 Februari 2005</time>
            </div>
          </li>

          <li class="contact-item">
            <div class="icon-box">
              <ion-icon name="location-outline"></ion-icon>
            </div>
            <div class="contact-info">
              <p class="contact-title" data-i18n="contact-address-label">Alamat</p>
              <address>Perumahan Kartika Wanasari, Cibitung, Kabupaten Bekasi, Jawa Barat</address>
            </div>
          </li>
        </ul>

        <div class="separator"></div>
      </div>
    </aside>
    `;
  },


  getNavbarHTML(type = 'main') {
    if (type === 'detail') {
      return `
      <!-- #NAVBAR -->
      <nav class="navbar">
        <ul class="navbar-list">
          <li class="navbar-item">
            <a href="index.html#tentang" class="navbar-link" data-i18n="nav-about-detail">Tentang</a>
          </li>
          <li class="navbar-item">
            <a href="index.html#portofolio" class="navbar-link active" data-i18n="nav-portfolio-detail">Portofolio</a>
          </li>
        </ul>
        <div class="lang-toggle" id="lang-toggle">
          <button class="lang-btn active" data-lang-btn="id">ID</button>
          <span class="lang-divider">|</span>
          <button class="lang-btn" data-lang-btn="en">EN</button>
        </div>
      </nav>
      `;
    }

    return `
    <!-- #NAVBAR -->
    <nav class="navbar">
      <ul class="navbar-list">
        <li class="navbar-item">
          <button class="navbar-link active" data-nav-link data-nav-target="tentang" data-i18n="nav-about">Tentang</button>
        </li>
        <li class="navbar-item">
          <button class="navbar-link" data-nav-link data-nav-target="portofolio" data-i18n="nav-portfolio">Portofolio</button>
        </li>
      </ul>
      <div class="lang-toggle" id="lang-toggle">
        <button class="lang-btn active" data-lang-btn="id">ID</button>
        <span class="lang-divider">|</span>
        <button class="lang-btn" data-lang-btn="en">EN</button>
      </div>
    </nav>
    `;
  },


  renderAll() {
    // Render Sidebar Component
    document.querySelectorAll('[data-component="sidebar"]').forEach(container => {
      container.outerHTML = this.getSidebarHTML();
    });

    // Render Navbar Component
    document.querySelectorAll('[data-component="navbar"]').forEach(container => {
      const type = container.getAttribute('data-nav-type') || 'main';
      container.outerHTML = this.getNavbarHTML(type);
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => PortfolioComponents.renderAll());
} else {
  PortfolioComponents.renderAll();
}
