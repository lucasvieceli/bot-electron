import LogoImg from '../../../../../assets/images/bcoin.png';
import { colors } from '../../../layout/colors';
import { IconItems, IconRobot, IconSetting } from '../../atoms';
import { MenuSideBarItem } from '../../molecules';
import { Container, ContentLogo, Gap, Logo } from './styles';
import { Menu } from './types';

const menus: Menu[] = [
    {
        color: colors.seledyn,
        Icon: <IconRobot width={25} color="white" />,
        href: '/',
    },
    {
        color: '#D98425',
        href: '/applications',
        Icon: <IconItems width={25} />,
    },
    {
        color: colors.yellow,
        href: '/setting',
        Icon: <IconSetting width={25} />,
    },
];

const MenuSideBar = () => {
    return (
        <Container>
            <ContentLogo>
                <Logo src={LogoImg} />
            </ContentLogo>
            {menus.map((menu, i) => (
                <div key={i.toString()}>
                    <MenuSideBarItem borderColor={menu.color} href={menu.href}>
                        {menu.Icon}
                    </MenuSideBarItem>
                    <Gap />
                </div>
            ))}
        </Container>
    );
};

export default MenuSideBar;
