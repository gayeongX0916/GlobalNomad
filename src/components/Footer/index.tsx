import FaceBookIcon from "@/assets/facebook_icon.svg";
import InstagramIcon from "@/assets/instagram_icon.svg";
import TwitterIcon from "@/assets/twitter_icon.svg";
import YoutubeIcon from "@/assets/youtube_icon.svg";
import Image from "next/image";

export function Footer() {
  const snsIcons = [
    { img: FaceBookIcon, label: "facebook" },
    { img: InstagramIcon, label: "instagram" },
    { img: TwitterIcon, label: "twitter" },
    { img: YoutubeIcon, label: "youtube" },
  ];

  return (
    <footer className="min-h-[160px] h-auto bg-nomadBlack pt-[32px] px-[104px] pb-[100px] flex justify-around w-full flex-col items-center md:flex-row">
      <div className="text-lg text-gray-600">@Codeit - 2023</div>
      <ul className="flex gap-x-[30px] text-lg text-gray-600">
        <li>Privacy Policy</li>
        <li>FAQ</li>
      </ul>
      <div className="flex gap-x-[12px] items-center mt-[16px] md:mt-0">
        {snsIcons.map((icon, idx) => (
          <button
            key={idx}
            type="button"
            className="w-[20px] h-[20px] cursor-pointer"
          >
            <Image src={icon.img} alt={icon.label} width={20} height={20} />
          </button>
        ))}
      </div>
    </footer>
  );
}
