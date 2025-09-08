import Image from "next/image";

// Icons
import FaceBookIcon from "@/assets/svgs/facebook_icon.svg";
import InstagramIcon from "@/assets/svgs/instagram_icon.svg";
import TwitterIcon from "@/assets/svgs/twitter_icon.svg";
import YoutubeIcon from "@/assets/svgs/youtube_icon.svg";

export function Footer() {
  const snsIcons = [
    {
      img: FaceBookIcon,
      label: "facebook",
      href: "https://www.facebook.com/?locale=ko_KR",
    },
    {
      img: InstagramIcon,
      label: "instagram",
      href: "https://www.instagram.com/",
    },
    { img: TwitterIcon, label: "twitter", href: "https://www.instagram.com/" },
    { img: YoutubeIcon, label: "youtube", href: "https://www.youtube.com/" },
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
          <a
            key={idx}
            href={icon.href}
            target="_blank"
            className="w-[20px] h-[20px] cursor-pointer"
            aria-label={icon.label}
          >
            <Image
              src={icon.img}
              alt=""
              aria-hidden="true"
              width={20}
              height={20}
            />
          </a>
        ))}
      </div>
    </footer>
  );
}
