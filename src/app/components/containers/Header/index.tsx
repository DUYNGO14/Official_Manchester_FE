import UserProfile from '@/app/components/common/UserProfile';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';
import { IUser } from '@/app/types/IUser';

export interface HeaderProps {
  user: IUser;
  isCalling: boolean;
  pathname: string | null;
  handleLogout: () => void;
}

const Header = () => {
  return (
    <>
      <UserProfile />
      <HeaderDesktop/>
      <HeaderMobile/>
    </>
  );
};

export default Header;