export function OpenPostCode(onComplete: (addr: string) => void) {
  if (!window.daum?.Postcode) return;

  new window.daum.Postcode({
    /* eslint-disable @typescript-eslint/no-explicit-any */
    oncomplete: (data: any) => {
      const roadAddr = data.roadAddress; 
      onComplete(roadAddr);
    },
  }).open(); 
}