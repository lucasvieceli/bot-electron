import LogoImg from '../../../../assets/images/bcoin.png';
import FlagEn from '../../../../assets/images/flag-en.png';
import FlagPtBR from '../../../../assets/images/flag-pt-br.png';
import { colors } from '../../../layout/colors';
import { IconItems, IconRobot, IconSetting } from '../../atoms';
import { BcoinPrice, ButtonLanguage, MenuSideBarItem } from '../../molecules';
import { Container, ContainerLanguage, ContainerMenus, ContentLogo, Gap, Logo } from './styles';
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
            <ContainerMenus>
                {menus.map((menu, i) => (
                    <div key={i.toString()}>
                        <MenuSideBarItem borderColor={menu.color} href={menu.href}>
                            {menu.Icon}
                        </MenuSideBarItem>
                        <Gap />
                    </div>
                ))}
            </ContainerMenus>
            <ContainerLanguage>
                <BcoinPrice />
                <ButtonLanguage language="pt-BR" image={FlagPtBR} />
                <ButtonLanguage language="en" image={FlagEn} />
            </ContainerLanguage>
        </Container>
    );
};

export default MenuSideBar;
