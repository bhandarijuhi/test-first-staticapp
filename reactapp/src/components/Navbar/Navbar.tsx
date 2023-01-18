import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import * as data from './links.json';
const linksString = JSON.stringify(data);
const links = JSON.parse(linksString).links;

type Link = {
    label: string;
    href: string;
};

const Links: React.FC<{ links: Link[] }> = ({ links }) => {
    const [userInfo, setUserInfo] = useState();

    const redirect = window.location.pathname;

    const providers = ['aad']; // we can add github, twitter, google in this list

    useEffect(() => {
      (async () => {
        setUserInfo(await getUserInfo());
      })();
    }, []);

    async function getUserInfo() {
      try {
        const response = await fetch('/.auth/me');
        const payload = await response.json();
        const { clientPrincipal } = payload;
        return clientPrincipal;
      } catch (error) {
        console.error('No profile could be found');
        return undefined;
      }
    }
    return (
        <div className={styles['links-container']}>
            {/* {links.map((link: Link) => {
                return (
                    <div key={link.href} className={styles['link']}>
                        <a href={link.href}>
                            {link.label}
                        </a>
                    </div>
                )
            })} */}
            <div key='Home' className={styles['link']}>
                  <a href={'/home'}>Home</a>
            </div>
            <div key='About' className={styles['link']}>
                  <a href={'/about'}>About</a>
            </div>
            {!userInfo &&
              providers.map((provider) => (
                <div key={provider} className={styles['link']}>
                  <a href={`/.auth/login/${provider}?post_login_redirect_uri=${redirect}`}>
                  {provider}
                  </a>
                </div>
              ))}
            {userInfo && 
              <div className={styles['link']}>
                <a href={`/.auth/logout?post_logout_redirect_uri=${redirect}`}>Logout</a>
              </div>
            }
        </div>
    )
};

const Navbar: React.FC<{}> = () => {
  return (
      <nav className={styles.navbar}>
          <div className={styles['logo-container']}>
              <span>Logo</span>
          </div>
          <Links links={links} />
      </nav>
  )
}


export default Navbar;