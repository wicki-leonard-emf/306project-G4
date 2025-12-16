function Depth9Frame() {
  return (
    <div className="h-full relative shrink-0 w-[159px]" data-name="Depth 9, Frame 0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[16px] py-[12px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#120f1a] text-[14px] w-full">Time</p>
      </div>
    </div>
  );
}

function Depth9Frame1() {
  return (
    <div className="h-full relative shrink-0 w-[147px]" data-name="Depth 9, Frame 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[16px] py-[12px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#120f1a] text-[14px] w-full">Status</p>
      </div>
    </div>
  );
}

function Depth9Frame2() {
  return (
    <div className="h-full relative shrink-0 w-[215px]" data-name="Depth 9, Frame 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[16px] py-[12px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#120f1a] text-[14px] w-full">Host</p>
      </div>
    </div>
  );
}

function Depth9Frame3() {
  return (
    <div className="h-full relative shrink-0 w-[183px]" data-name="Depth 9, Frame 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[16px] py-[12px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#120f1a] text-[14px] w-full">Request</p>
      </div>
    </div>
  );
}

function Depth9Frame4() {
  return (
    <div className="h-full relative shrink-0 w-[171px]" data-name="Depth 9, Frame 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[16px] py-[12px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#120f1a] text-[14px] w-full">Messages</p>
      </div>
    </div>
  );
}

export default function Depth8Frame() {
  return (
    <div className="bg-[#fafafa] content-stretch flex items-start relative size-full" data-name="Depth 8, Frame 0">
      <Depth9Frame />
      <Depth9Frame1 />
      <Depth9Frame2 />
      <Depth9Frame3 />
      <Depth9Frame4 />
    </div>
  );
}