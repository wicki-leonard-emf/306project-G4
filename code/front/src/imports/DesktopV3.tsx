import svgPaths from "./svg-734m2ckqag";
import imgLogo from "figma:asset/d0fc03f5c47a5583e2cfa35ac5f6aa36545efb07.png";
import imgAvatar from "figma:asset/67da9fddd372b1b5b44ffef41eed6ceb810ddf8a.png";

function LogoAndTitle() {
  return (
    <div className="content-stretch flex gap-[14px] items-center relative shrink-0" data-name="Logo and title">
      <div className="relative shrink-0 size-[56px]" data-name="Logo">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgLogo} />
      </div>
      <p className="font-['Geist:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#181d27] text-[24px] text-nowrap tracking-[-0.48px]">SensorHub</p>
    </div>
  );
}

function Header() {
  return (
    <div className="relative shrink-0 w-full" data-name="header">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[14px] relative w-full">
          <LogoAndTitle />
        </div>
      </div>
    </div>
  );
}

function Search() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="search">
          <path d={svgPaths.p272bfa00} id="Icon" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Content() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <Search />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#717680] text-[16px] text-nowrap">Recherche</p>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[14px] py-[10px] relative w-full">
          <Content />
        </div>
      </div>
    </div>
  );
}

function InputWithLabel() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Input with label">
      <Input />
    </div>
  );
}

function SelectInputBase() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-0" data-name="_Select input base">
      <InputWithLabel />
    </div>
  );
}

function Select() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Select">
      <SelectInputBase />
    </div>
  );
}

function Search1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Search">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[24px] py-0 relative w-full">
          <Select />
        </div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="home">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="home">
          <path d={svgPaths.p2ff764c0} id="Icon" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content">
      <Home />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#414651] text-[16px] text-nowrap">Maison</p>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-down">
          <path d="M5 7.5L10 12.5L15 7.5" id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Actions">
      <ChevronDown />
    </div>
  );
}

function NavItemBase() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[6px] shrink-0" data-name="_Nav item base">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative w-full">
          <Content1 />
          <Actions />
        </div>
      </div>
    </div>
  );
}

function NavItemDropdownBase() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="_Nav item dropdown base">
      <NavItemBase />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M18 20V10M12 20V4M6 20V14" id="Icon_2" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content">
      <Icon />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#414651] text-[16px] text-nowrap">Tableau de bord</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M15 12.5L10 7.5L5 12.5" id="Icon_2" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.38889" />
        </g>
      </svg>
    </div>
  );
}

function Actions1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Actions">
      <Icon1 />
    </div>
  );
}

function NavItemBase1() {
  return (
    <div className="bg-[#fafafa] relative rounded-[6px] shrink-0 w-full" data-name="_Nav item base">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative w-full">
          <Content2 />
          <Actions1 />
        </div>
      </div>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Content">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#414651] text-[16px] text-nowrap">Aperçu</p>
    </div>
  );
}

function NavItemBase2() {
  return (
    <div className="bg-[#fafafa] relative rounded-[6px] shrink-0 w-full" data-name="_Nav item base">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center pl-[48px] pr-[12px] py-[8px] relative w-full">
          <Content3 />
        </div>
      </div>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Content">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#414651] text-[16px] text-nowrap">Notifications</p>
    </div>
  );
}

function BadgeBase() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex items-center justify-center px-[10px] py-[2px] relative rounded-[16px] shrink-0" data-name="_Badge base">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#414651] text-[14px] text-center text-nowrap">10</p>
    </div>
  );
}

function Badge() {
  return (
    <div className="content-stretch flex items-start mix-blend-multiply relative shrink-0" data-name="Badge">
      <BadgeBase />
    </div>
  );
}

function Actions2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Actions">
      <Badge />
    </div>
  );
}

function NavItemBase3() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="_Nav item base">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between pl-[48px] pr-[12px] py-[8px] relative w-full">
          <Content4 />
          <Actions2 />
        </div>
      </div>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Content">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#414651] text-[16px] text-nowrap">Historique des transactions</p>
    </div>
  );
}

function NavItemBase4() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="_Nav item base">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center pl-[48px] pr-[12px] py-[8px] relative w-full">
          <Content5 />
        </div>
      </div>
    </div>
  );
}

function Menu() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start pb-[8px] pt-0 px-0 relative shrink-0 w-full" data-name="Menu">
      <NavItemBase2 />
      <NavItemBase3 />
      <NavItemBase4 />
    </div>
  );
}

function NavItemDropdownBase1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="_Nav item dropdown base">
      <NavItemBase1 />
      <Menu />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.pae41680} id="Icon_2" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content">
      <Icon2 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#414651] text-[16px] text-nowrap">Utilisateurs</p>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-down">
          <path d="M5 7.5L10 12.5L15 7.5" id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Actions3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Actions">
      <Icon3 />
    </div>
  );
}

function NavItemBase5() {
  return (
    <div className="bg-white content-stretch flex h-[40px] items-center justify-between overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[279px]" data-name="_Nav item base">
      <Content6 />
      <Actions3 />
    </div>
  );
}

function NavItemDropdownBase2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="_Nav item dropdown base">
      <NavItemBase5 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="relative shrink-0 w-full" data-name="Navigation">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-start px-[16px] py-0 relative w-full">
          <NavItemDropdownBase />
          <NavItemDropdownBase1 />
          <NavItemDropdownBase2 />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start pb-0 pt-[32px] px-0 relative shrink-0 w-full" data-name="Nav">
      <Header />
      <Search1 />
      <Navigation />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d="M10 2V10L13 7L16 10V2" id="Vector" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2460274} id="Vector_2" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content">
      <Frame />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#414651] text-[16px] text-nowrap">Documentation</p>
    </div>
  );
}

function NavItemBase6() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="_Nav item base">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[12px] py-[8px] relative w-full">
          <Content7 />
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_7303)" id="Icon">
          <g id="Icon_2">
            <path d={svgPaths.p3cccb600} stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p3737f500} stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_7303">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Content">
      <Icon4 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#414651] text-[16px] text-nowrap">Paramètres</p>
    </div>
  );
}

function NavItemBase7() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="_Nav item base">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[12px] py-[8px] relative w-full">
          <Content8 />
        </div>
      </div>
    </div>
  );
}

function Navigation1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Navigation">
      <NavItemBase6 />
      <NavItemBase7 />
    </div>
  );
}

function Avatar() {
  return (
    <div className="relative rounded-[200px] shrink-0 size-[40px]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[200px] size-full" src={imgAvatar} />
    </div>
  );
}

function TextAndSupportingText() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#181d27] text-[14px] text-nowrap">Olivia Rhye</p>
    </div>
  );
}

function AvatarLabelGroup() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Avatar label group">
      <Avatar />
      <TextAndSupportingText />
    </div>
  );
}

function LogOut() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="log-out">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="log-out">
          <path d={svgPaths.p17b1b80} id="Icon" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
        </g>
      </svg>
    </div>
  );
}

function ButtonBase() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[8px] relative rounded-[8px] shrink-0" data-name="_Button base">
      <LogOut />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute content-stretch flex items-start left-1/2 rounded-[8px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Button">
      <ButtonBase />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <Button />
    </div>
  );
}

function Account() {
  return (
    <div className="relative shrink-0 w-full" data-name="Account">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[8px] py-0 relative w-full">
          <AvatarLabelGroup />
          <Icon5 />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="relative shrink-0 w-full" data-name="Footer">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start pb-[32px] pt-0 px-[16px] relative w-full">
          <Navigation1 />
          <div className="h-px relative shrink-0 w-full" data-name="Divider">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 279 1">
              <path clipRule="evenodd" d="M279 1H0V0H279V1Z" fill="var(--fill-0, #E9EAEB)" fillRule="evenodd" id="Divider" />
            </svg>
          </div>
          <Account />
        </div>
      </div>
    </div>
  );
}

function Content9() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-full items-start justify-between min-h-px min-w-px relative shrink-0" data-name="Content">
      <Nav />
      <Footer />
    </div>
  );
}

function SidebarNavigation() {
  return (
    <div className="bg-white content-stretch flex h-full items-start relative shrink-0 w-[312px]" data-name="Sidebar navigation">
      <Content9 />
      <div className="h-full relative shrink-0 w-px" data-name="Divider">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 960">
          <path clipRule="evenodd" d="M1 960H0V0H1V960Z" fill="var(--fill-0, #E9EAEB)" fillRule="evenodd" id="Divider" />
        </svg>
      </div>
    </div>
  );
}

function TextAndSupportingText1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px not-italic relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[38px] relative shrink-0 text-[#181d27] text-[30px] w-full">Bon retour, Olivia</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#535862] text-[16px] w-full">Suivez et gérez le climat des salles de classes</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.p1d2235f0} id="Vector" stroke="var(--stroke-0, #414651)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
        </g>
      </svg>
    </div>
  );
}

function ButtonBase1() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0" data-name="_Button base">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[inherit]">
        <Frame1 />
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#414651] text-[14px] text-nowrap">Gérer le seuil par défaut</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
      <ButtonBase1 />
    </div>
  );
}

function Plus() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="plus">
          <path d={svgPaths.p17eb400} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
        </g>
      </svg>
    </div>
  );
}

function ButtonBase2() {
  return (
    <div className="bg-[#7f56d9] relative rounded-[8px] shrink-0" data-name="_Button base">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[inherit]">
        <Plus />
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white">Ajouter</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#7f56d9] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
      <ButtonBase2 />
    </div>
  );
}

function Actions4() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Actions">
      <Button1 />
      <Button2 />
    </div>
  );
}

function Content10() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Content">
      <TextAndSupportingText1 />
      <Actions4 />
    </div>
  );
}

function PageHeader() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Page header">
      <Content10 />
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[32px] py-0 relative w-full">
          <PageHeader />
        </div>
      </div>
    </div>
  );
}

function HeaderSection() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Header section">
      <Container />
    </div>
  );
}

function X() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="x">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="x">
          <path d="M15 5L5 15M5 5L15 15" id="Icon" stroke="var(--stroke-0, #414651)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
        </g>
      </svg>
    </div>
  );
}

function ButtonBase3() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0" data-name="_Button base">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[inherit]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#414651] text-[14px] text-nowrap">Tout le temps</p>
        <X />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
      <ButtonBase3 />
    </div>
  );
}

function X1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="x">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="x">
          <path d="M15 5L5 15M5 5L15 15" id="Icon" stroke="var(--stroke-0, #414651)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
        </g>
      </svg>
    </div>
  );
}

function ButtonBase4() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0" data-name="_Button base">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[inherit]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#414651] text-[14px] text-nowrap">Abonnements</p>
        <X1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
      <ButtonBase4 />
    </div>
  );
}

function FiltersLines() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Filters lines">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Filters lines">
          <path d={svgPaths.p29f1100} id="Icon" stroke="var(--stroke-0, #414651)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
        </g>
      </svg>
    </div>
  );
}

function ButtonBase5() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0" data-name="_Button base">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[inherit]">
        <FiltersLines />
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#414651] text-[14px] text-nowrap">Plus de filtres</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-name="Button">
      <ButtonBase5 />
    </div>
  );
}

function Dropdowns() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Dropdowns">
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}

function Search2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="search">
          <path d={svgPaths.p272bfa00} id="Icon" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Content11() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <Search2 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#717680] text-[16px] text-nowrap">Recherche</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[14px] py-[10px] relative w-full">
          <Content11 />
        </div>
      </div>
    </div>
  );
}

function InputWithLabel1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Input with label">
      <Input1 />
    </div>
  );
}

function SelectInputBase1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-0" data-name="_Select input base">
      <InputWithLabel1 />
    </div>
  );
}

function Select1() {
  return (
    <div className="h-[44px] relative shrink-0 w-[320px]" data-name="Select">
      <SelectInputBase1 />
    </div>
  );
}

function Content12() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <Dropdowns />
      <Select1 />
    </div>
  );
}

function FiltersBar() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0 w-full" data-name="Filters bar">
      <Content12 />
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[32px] py-0 relative w-full">
          <FiltersBar />
        </div>
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Section">
      <Container1 />
    </div>
  );
}

function MoreVertical() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="more-vertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="more-vertical">
          <g id="Icon">
            <path d={svgPaths.p39a1e780} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p11974af0} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p133c1580} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Dropdown() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Dropdown">
      <MoreVertical />
    </div>
  );
}

function HeadingAndDropdown() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Heading and dropdown">
      <p className="basis-0 font-['Inter:Semi_Bold',sans-serif] font-semibold grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#181d27] text-[16px]">A35</p>
      <Dropdown />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p3f155f00} id="Icon_2" stroke="var(--stroke-0, #4A72EA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Change() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="_Change">
      <Icon6 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#4a72ea] text-[14px] text-center text-nowrap">4º</p>
    </div>
  );
}

function ChangeAndText() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Change and text">
      <Change />
      <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#535862] text-[14px]">Depuis ce matin</p>
    </div>
  );
}

function NumberAndBadge() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Number and badge">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[44px] not-italic relative shrink-0 text-[#181d27] text-[36px] tracking-[-0.72px] w-full">13º</p>
      <ChangeAndText />
    </div>
  );
}

function Chart() {
  return (
    <div className="h-[48px] relative shrink-0 w-[96px]" data-name="_Chart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 96 48">
        <g id="_Chart">
          <path d={svgPaths.p37f54400} id="Line" stroke="var(--stroke-0, #4A72EA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function NumberAndChart() {
  return (
    <div className="content-stretch flex gap-[16px] items-end relative shrink-0 w-full" data-name="Number and chart">
      <NumberAndBadge />
      <Chart />
    </div>
  );
}

function MetricItem() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Metric item">
      <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative w-full">
          <HeadingAndDropdown />
          <NumberAndChart />
        </div>
      </div>
    </div>
  );
}

function MoreVertical1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="more-vertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="more-vertical">
          <g id="Icon">
            <path d={svgPaths.p39a1e780} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p11974af0} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p133c1580} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Dropdown1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Dropdown">
      <MoreVertical1 />
    </div>
  );
}

function HeadingAndDropdown1() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Heading and dropdown">
      <p className="basis-0 font-['Inter:Semi_Bold',sans-serif] font-semibold grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#181d27] text-[16px]">A44</p>
      <Dropdown1 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p3f155f00} id="Icon_2" stroke="var(--stroke-0, #F04438)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Change1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="_Change">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <Icon7 />
        </div>
      </div>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#b42318] text-[14px] text-center text-nowrap">10%</p>
    </div>
  );
}

function ChangeAndText1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Change and text">
      <Change1 />
      <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#535862] text-[14px]">Depuis hier</p>
    </div>
  );
}

function NumberAndBadge1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Number and badge">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[44px] not-italic relative shrink-0 text-[#181d27] text-[36px] tracking-[-0.72px] w-full">12º</p>
      <ChangeAndText1 />
    </div>
  );
}

function Chart1() {
  return (
    <div className="h-[48px] relative shrink-0 w-[96px]" data-name="_Chart">
      <div className="absolute inset-[-1.56%_-0.78%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 98 50">
          <g id="_Chart">
            <path d={svgPaths.p39efab00} fill="var(--fill-0, #FEF3F2)" id="Background base" />
            <path d={svgPaths.p39efab00} fill="url(#paint0_linear_1_7277)" id="Background gradient" />
            <path d={svgPaths.pcc94ce0} id="Line" stroke="var(--stroke-0, #F04438)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_7277" x1="48.75" x2="48.75" y1="0.750042" y2="48.75">
              <stop offset="0.641167" stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function NumberAndChart1() {
  return (
    <div className="content-stretch flex gap-[16px] items-end relative shrink-0 w-full" data-name="Number and chart">
      <NumberAndBadge1 />
      <Chart1 />
    </div>
  );
}

function MetricItem1() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Metric item">
      <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative w-full">
          <HeadingAndDropdown1 />
          <NumberAndChart1 />
        </div>
      </div>
    </div>
  );
}

function MoreVertical2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="more-vertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="more-vertical">
          <g id="Icon">
            <path d={svgPaths.p39a1e780} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p11974af0} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p133c1580} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Dropdown2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Dropdown">
      <MoreVertical2 />
    </div>
  );
}

function HeadingAndDropdown2() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Heading and dropdown">
      <p className="basis-0 font-['Inter:Semi_Bold',sans-serif] font-semibold grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#181d27] text-[16px]">C36</p>
      <Dropdown2 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p2dc9a500} id="Icon_2" stroke="var(--stroke-0, #4A72EA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Change2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="_Change">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <Icon8 />
        </div>
      </div>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#4a72ea] text-[14px] text-center text-nowrap">20%</p>
    </div>
  );
}

function ChangeAndText2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Change and text">
      <Change2 />
      <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#535862] text-[14px]">Cette semaine</p>
    </div>
  );
}

function NumberAndBadge2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Number and badge">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[44px] not-italic relative shrink-0 text-[#181d27] text-[36px] tracking-[-0.72px] w-full">23º</p>
      <ChangeAndText2 />
    </div>
  );
}

function Chart2() {
  return (
    <div className="h-[48px] relative shrink-0 w-[96px]" data-name="_Chart">
      <div className="absolute inset-[-1.56%_-0.78%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 98 50">
          <g id="_Chart">
            <path d={svgPaths.p32377300} fill="var(--fill-0, #4A72EA)" fillOpacity="0.1" id="Background base" />
            <path d={svgPaths.p32377300} fill="url(#paint0_linear_1_7330)" id="Background gradient" />
            <path d={svgPaths.p2d23a3c0} id="Line" stroke="var(--stroke-0, #4A72EA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_7330" x1="48.7502" x2="48.7502" y1="0.750042" y2="48.75">
              <stop offset="0.641167" stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function NumberAndChart2() {
  return (
    <div className="content-stretch flex gap-[16px] items-end relative shrink-0 w-full" data-name="Number and chart">
      <NumberAndBadge2 />
      <Chart2 />
    </div>
  );
}

function MetricItem2() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Metric item">
      <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative w-full">
          <HeadingAndDropdown2 />
          <NumberAndChart2 />
        </div>
      </div>
    </div>
  );
}

function MetricGroup() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="Metric group">
      <MetricItem />
      <MetricItem1 />
      <MetricItem2 />
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[32px] py-0 relative w-full">
          <MetricGroup />
        </div>
      </div>
    </div>
  );
}

function Section1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Section">
      <Container2 />
    </div>
  );
}

function MoreVertical3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="more-vertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="more-vertical">
          <g id="Icon">
            <path d={svgPaths.p39a1e780} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p11974af0} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p133c1580} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Dropdown3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Dropdown">
      <MoreVertical3 />
    </div>
  );
}

function HeadingAndDropdown3() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Heading and dropdown">
      <p className="basis-0 font-['Inter:Semi_Bold',sans-serif] font-semibold grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#181d27] text-[16px]">A37</p>
      <Dropdown3 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p3f155f00} id="Icon_2" stroke="var(--stroke-0, #4A72EA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Change3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="_Change">
      <Icon9 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#4a72ea] text-[14px] text-center text-nowrap">4º</p>
    </div>
  );
}

function ChangeAndText3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Change and text">
      <Change3 />
      <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#535862] text-[14px]">Depuis ce matin</p>
    </div>
  );
}

function NumberAndBadge3() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Number and badge">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[44px] not-italic relative shrink-0 text-[#181d27] text-[36px] tracking-[-0.72px] w-full">13º</p>
      <ChangeAndText3 />
    </div>
  );
}

function Chart3() {
  return (
    <div className="h-[48px] relative shrink-0 w-[96px]" data-name="_Chart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 96 48">
        <g id="_Chart">
          <path d={svgPaths.p37f54400} id="Line" stroke="var(--stroke-0, #4A72EA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function NumberAndChart3() {
  return (
    <div className="content-stretch flex gap-[16px] items-end relative shrink-0 w-full" data-name="Number and chart">
      <NumberAndBadge3 />
      <Chart3 />
    </div>
  );
}

function MetricItem3() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Metric item">
      <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative w-full">
          <HeadingAndDropdown3 />
          <NumberAndChart3 />
        </div>
      </div>
    </div>
  );
}

function MoreVertical4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="more-vertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="more-vertical">
          <g id="Icon">
            <path d={svgPaths.p39a1e780} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p11974af0} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p133c1580} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Dropdown4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Dropdown">
      <MoreVertical4 />
    </div>
  );
}

function HeadingAndDropdown4() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Heading and dropdown">
      <p className="basis-0 font-['Inter:Semi_Bold',sans-serif] font-semibold grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#181d27] text-[16px]">A36</p>
      <Dropdown4 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p2dc9a500} id="Icon_2" stroke="var(--stroke-0, #4A72EA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Change4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="_Change">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <Icon10 />
        </div>
      </div>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#4a72ea] text-[14px] text-center text-nowrap">20%</p>
    </div>
  );
}

function ChangeAndText4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Change and text">
      <Change4 />
      <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#535862] text-[14px]">Cette semaine</p>
    </div>
  );
}

function NumberAndBadge4() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Number and badge">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[44px] not-italic relative shrink-0 text-[#181d27] text-[36px] tracking-[-0.72px] w-full">23º</p>
      <ChangeAndText4 />
    </div>
  );
}

function Chart4() {
  return (
    <div className="h-[48px] relative shrink-0 w-[96px]" data-name="_Chart">
      <div className="absolute inset-[-1.56%_-0.78%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 98 50">
          <g id="_Chart">
            <path d={svgPaths.p32377300} fill="var(--fill-0, #4A72EA)" fillOpacity="0.1" id="Background base" />
            <path d={svgPaths.p32377300} fill="url(#paint0_linear_1_7330)" id="Background gradient" />
            <path d={svgPaths.p2d23a3c0} id="Line" stroke="var(--stroke-0, #4A72EA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_7330" x1="48.7502" x2="48.7502" y1="0.750042" y2="48.75">
              <stop offset="0.641167" stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function NumberAndChart4() {
  return (
    <div className="content-stretch flex gap-[16px] items-end relative shrink-0 w-full" data-name="Number and chart">
      <NumberAndBadge4 />
      <Chart4 />
    </div>
  );
}

function MetricItem4() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Metric item">
      <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative w-full">
          <HeadingAndDropdown4 />
          <NumberAndChart4 />
        </div>
      </div>
    </div>
  );
}

function MoreVertical5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="more-vertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="more-vertical">
          <g id="Icon">
            <path d={svgPaths.p39a1e780} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p11974af0} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p133c1580} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Dropdown5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Dropdown">
      <MoreVertical5 />
    </div>
  );
}

function HeadingAndDropdown5() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Heading and dropdown">
      <p className="basis-0 font-['Inter:Semi_Bold',sans-serif] font-semibold grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#181d27] text-[16px]">A42</p>
      <Dropdown5 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p3f155f00} id="Icon_2" stroke="var(--stroke-0, #F04438)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Change5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="_Change">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <Icon11 />
        </div>
      </div>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#b42318] text-[14px] text-center text-nowrap">10%</p>
    </div>
  );
}

function ChangeAndText5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Change and text">
      <Change5 />
      <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#535862] text-[14px]">Depuis hier</p>
    </div>
  );
}

function NumberAndBadge5() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Number and badge">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[44px] not-italic relative shrink-0 text-[#181d27] text-[36px] tracking-[-0.72px] w-full">12º</p>
      <ChangeAndText5 />
    </div>
  );
}

function Chart5() {
  return (
    <div className="h-[48px] relative shrink-0 w-[96px]" data-name="_Chart">
      <div className="absolute inset-[-1.56%_-0.78%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 98 50">
          <g id="_Chart">
            <path d={svgPaths.p39efab00} fill="var(--fill-0, #FEF3F2)" id="Background base" />
            <path d={svgPaths.p39efab00} fill="url(#paint0_linear_1_7277)" id="Background gradient" />
            <path d={svgPaths.pcc94ce0} id="Line" stroke="var(--stroke-0, #F04438)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_7277" x1="48.75" x2="48.75" y1="0.750042" y2="48.75">
              <stop offset="0.641167" stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function NumberAndChart5() {
  return (
    <div className="content-stretch flex gap-[16px] items-end relative shrink-0 w-full" data-name="Number and chart">
      <NumberAndBadge5 />
      <Chart5 />
    </div>
  );
}

function MetricItem5() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Metric item">
      <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative w-full">
          <HeadingAndDropdown5 />
          <NumberAndChart5 />
        </div>
      </div>
    </div>
  );
}

function MetricGroup1() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="Metric group">
      <MetricItem3 />
      <MetricItem4 />
      <MetricItem5 />
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[32px] py-0 relative w-full">
          <MetricGroup1 />
        </div>
      </div>
    </div>
  );
}

function Section2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Section">
      <Container3 />
    </div>
  );
}

function MoreVertical6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="more-vertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="more-vertical">
          <g id="Icon">
            <path d={svgPaths.p39a1e780} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p11974af0} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p133c1580} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Dropdown6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Dropdown">
      <MoreVertical6 />
    </div>
  );
}

function HeadingAndDropdown6() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Heading and dropdown">
      <p className="basis-0 font-['Inter:Semi_Bold',sans-serif] font-semibold grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#181d27] text-[16px]">A45</p>
      <Dropdown6 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p3f155f00} id="Icon_2" stroke="var(--stroke-0, #F04438)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Change6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="_Change">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <Icon12 />
        </div>
      </div>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#b42318] text-[14px] text-center text-nowrap">10%</p>
    </div>
  );
}

function ChangeAndText6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Change and text">
      <Change6 />
      <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#535862] text-[14px]">Depuis hier</p>
    </div>
  );
}

function NumberAndBadge6() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Number and badge">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[44px] not-italic relative shrink-0 text-[#181d27] text-[36px] tracking-[-0.72px] w-full">12º</p>
      <ChangeAndText6 />
    </div>
  );
}

function Chart6() {
  return (
    <div className="h-[48px] relative shrink-0 w-[96px]" data-name="_Chart">
      <div className="absolute inset-[-1.56%_-0.78%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 98 50">
          <g id="_Chart">
            <path d={svgPaths.p39efab00} fill="var(--fill-0, #FEF3F2)" id="Background base" />
            <path d={svgPaths.p39efab00} fill="url(#paint0_linear_1_7277)" id="Background gradient" />
            <path d={svgPaths.pcc94ce0} id="Line" stroke="var(--stroke-0, #F04438)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_7277" x1="48.75" x2="48.75" y1="0.750042" y2="48.75">
              <stop offset="0.641167" stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function NumberAndChart6() {
  return (
    <div className="content-stretch flex gap-[16px] items-end relative shrink-0 w-full" data-name="Number and chart">
      <NumberAndBadge6 />
      <Chart6 />
    </div>
  );
}

function MetricItem6() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Metric item">
      <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative w-full">
          <HeadingAndDropdown6 />
          <NumberAndChart6 />
        </div>
      </div>
    </div>
  );
}

function MoreVertical7() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="more-vertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="more-vertical">
          <g id="Icon">
            <path d={svgPaths.p39a1e780} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p11974af0} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p133c1580} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Dropdown7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Dropdown">
      <MoreVertical7 />
    </div>
  );
}

function HeadingAndDropdown7() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Heading and dropdown">
      <p className="basis-0 font-['Inter:Semi_Bold',sans-serif] font-semibold grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#181d27] text-[16px]">A41</p>
      <Dropdown7 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p2dc9a500} id="Icon_2" stroke="var(--stroke-0, #4A72EA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Change7() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="_Change">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <Icon13 />
        </div>
      </div>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#4a72ea] text-[14px] text-center text-nowrap">20%</p>
    </div>
  );
}

function ChangeAndText7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Change and text">
      <Change7 />
      <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#535862] text-[14px]">Cette semaine</p>
    </div>
  );
}

function NumberAndBadge7() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Number and badge">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[44px] not-italic relative shrink-0 text-[#181d27] text-[36px] tracking-[-0.72px] w-full">23º</p>
      <ChangeAndText7 />
    </div>
  );
}

function Chart7() {
  return (
    <div className="h-[48px] relative shrink-0 w-[96px]" data-name="_Chart">
      <div className="absolute inset-[-1.56%_-0.78%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 98 50">
          <g id="_Chart">
            <path d={svgPaths.p32377300} fill="var(--fill-0, #4A72EA)" fillOpacity="0.1" id="Background base" />
            <path d={svgPaths.p32377300} fill="url(#paint0_linear_1_7330)" id="Background gradient" />
            <path d={svgPaths.p2d23a3c0} id="Line" stroke="var(--stroke-0, #4A72EA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_7330" x1="48.7502" x2="48.7502" y1="0.750042" y2="48.75">
              <stop offset="0.641167" stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function NumberAndChart7() {
  return (
    <div className="content-stretch flex gap-[16px] items-end relative shrink-0 w-full" data-name="Number and chart">
      <NumberAndBadge7 />
      <Chart7 />
    </div>
  );
}

function MetricItem7() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Metric item">
      <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative w-full">
          <HeadingAndDropdown7 />
          <NumberAndChart7 />
        </div>
      </div>
    </div>
  );
}

function MoreVertical8() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="more-vertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="more-vertical">
          <g id="Icon">
            <path d={svgPaths.p39a1e780} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p11974af0} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p133c1580} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Dropdown8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Dropdown">
      <MoreVertical8 />
    </div>
  );
}

function HeadingAndDropdown8() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Heading and dropdown">
      <p className="basis-0 font-['Inter:Semi_Bold',sans-serif] font-semibold grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#181d27] text-[16px]">A34</p>
      <Dropdown8 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p3f155f00} id="Icon_2" stroke="var(--stroke-0, #4A72EA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Change8() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="_Change">
      <Icon14 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#4a72ea] text-[14px] text-center text-nowrap">4º</p>
    </div>
  );
}

function ChangeAndText8() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Change and text">
      <Change8 />
      <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#535862] text-[14px]">Depuis ce matin</p>
    </div>
  );
}

function NumberAndBadge8() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Number and badge">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[44px] not-italic relative shrink-0 text-[#181d27] text-[36px] tracking-[-0.72px] w-full">13º</p>
      <ChangeAndText8 />
    </div>
  );
}

function Chart8() {
  return (
    <div className="h-[48px] relative shrink-0 w-[96px]" data-name="_Chart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 96 48">
        <g id="_Chart">
          <path d={svgPaths.p37f54400} id="Line" stroke="var(--stroke-0, #4A72EA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function NumberAndChart8() {
  return (
    <div className="content-stretch flex gap-[16px] items-end relative shrink-0 w-full" data-name="Number and chart">
      <NumberAndBadge8 />
      <Chart8 />
    </div>
  );
}

function MetricItem8() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Metric item">
      <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative w-full">
          <HeadingAndDropdown8 />
          <NumberAndChart8 />
        </div>
      </div>
    </div>
  );
}

function MetricGroup2() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="Metric group">
      <MetricItem6 />
      <MetricItem7 />
      <MetricItem8 />
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[32px] py-0 relative w-full">
          <MetricGroup2 />
        </div>
      </div>
    </div>
  );
}

function Section3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Section">
      <Container4 />
    </div>
  );
}

function Main() {
  return (
    <div className="basis-0 bg-white content-stretch flex flex-col gap-[32px] grow items-start min-h-px min-w-px pb-[48px] pt-[32px] px-0 relative shrink-0" data-name="Main">
      <HeaderSection />
      <Section />
      <Section1 />
      <Section2 />
      <Section3 />
    </div>
  );
}

export default function DesktopV() {
  return (
    <div className="bg-white content-stretch flex items-start relative size-full" data-name="Desktop v3">
      <SidebarNavigation />
      <Main />
    </div>
  );
}