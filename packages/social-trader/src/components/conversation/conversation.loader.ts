import {
  ConversationMessagePersonalDetails,
  ConversationPost,
  IConversationImage,
  IConversationUser
} from "components/conversation/conversation.types";
import { managerLoaderData } from "components/details/details.loader-data";
import { PostTag } from "gv-api-web";
import {
  getRandomBoolean,
  getRandomInteger,
  getRandomWord,
  getRandomWords,
  tableLoaderCreator
} from "utils/helpers";
import uuid from "uuid";

const getTagLoaderData = (): PostTag => ({
  title: "",
  post: {
    id: getRandomWord(),
    text: getRandomWord(),
    date: new Date(),
    likesCount: getRandomInteger(1, 5),
    isPinned: false,
    images: [],
    tags: [],
    author: managerLoaderData,
    actions: {
      isLiked: true,
      canEdit: false,
      canDelete: false,
      canPin: false
    },
    comments: []
  },
  number: 0,
  assetDetails: {
    url: getRandomWord(),
    assetType: "Program",
    title: getRandomWord(),
    id: "",
    color: "",
    logo: "",
    programDetails: { level: 0, levelProgress: 0 }
  },
  type: "Program",
  userDetails: {
    id: "",
    username: "",
    url: ""
  },
  platformAssetDetails: {
    id: "string",
    name: "string",
    asset: "string",
    description: "string",
    icon: "string",
    color: "string",
    mandatoryFundPercent: 0,
    url: "string"
  }
});

const getRandomTextString = (tagNumber: number): string => {
  const strings = [
    `${getRandomWords(
      getRandomInteger(1, 5)
    )} (@tag-${tagNumber}) ${getRandomWords(getRandomInteger(1, 5))}`,
    `${getRandomWords(
      getRandomInteger(1, 5)
    )} @tag-${tagNumber}. ${getRandomWords(getRandomInteger(1, 5))}`,
    `${getRandomWords(
      getRandomInteger(1, 5)
    )},@tag-${tagNumber},${getRandomWords(getRandomInteger(1, 5))}`,
    `${getRandomWords(
      getRandomInteger(1, 5)
    )} "@tag-${tagNumber}" ${getRandomWords(getRandomInteger(1, 5))}`
  ];
  return strings[getRandomInteger(0, strings.length - 1)];
};

const getMockTextAndTags = () => {
  const tags = tableLoaderCreator(getTagLoaderData, getRandomInteger(1, 30));
  const text = tags.map((_, i) => getRandomTextString(i)).join(". ");
  return { tags, text };
};

const mockImages = [
  "",
  "",
  "",
  "",
  "https://sun9-34.userapi.com/c856524/v856524495/11de66/h3Foz32hnfU.jpg",
  "https://sun9-61.userapi.com/c856524/v856524495/11de6f/81POcn8KOqU.jpg",
  "https://sun9-66.userapi.com/c856524/v856524495/11de76/W47wvXL-0tc.jpg",
  "https://sun9-67.userapi.com/c856524/v856524495/11de7d/_UhvIMfvgng.jpg",
  "https://sun9-42.userapi.com/c856524/v856524495/11de84/kuSNAN09J20.jpg",
  "https://sun9-28.userapi.com/c856524/v856524495/11de8d/A8gcII5r2xs.jpg",
  "https://sun9-28.userapi.com/c856524/v856524495/11de94/IoUh6b4l_Mc.jpg",
  "https://sun9-65.userapi.com/c856524/v856524495/11de9b/BO4UiSjv7tE.jpg",
  "https://sun9-61.userapi.com/c856524/v856524495/11dea2/Mq0RNVLR4WM.jpg",
  "https://sun9-6.userapi.com/c856524/v856524495/11deaa/dybBqKaC6rE.jpg",
  "https://sun9-59.userapi.com/c856524/v856524495/11deb3/zHaHvC9fTO4.jpg",
  "https://sun9-25.userapi.com/c856524/v856524495/11deba/8WUFWX9mOwM.jpg",
  "https://sun9-32.userapi.com/c857328/v857328519/1223db/bHocmSAuc2M.jpg",
  "https://sun9-35.userapi.com/c857336/v857336259/123957/IClFjwh8YnE.jpg",
  "https://sun9-44.userapi.com/c857328/v857328519/1223e2/kkqXCLDz-ZQ.jpg"
];

export const getConversationImageLoaderData = (): IConversationImage => ({
  image: mockImages[getRandomInteger(0, mockImages.length - 1)]
});

export const getConversationPersonalDetailsLoaderData = (): ConversationMessagePersonalDetails => ({
  canEdit: getRandomBoolean(),
  canDelete: getRandomBoolean(),
  isLiked: getRandomBoolean(),
  canPin: getRandomBoolean()
});

export const getConversationUserLoaderData = (): IConversationUser => ({
  socialLinks: [],
  registrationDate: new Date(),
  avatar: "",
  id: uuid.v4(),
  username: getRandomWord(getRandomInteger(8, 50)),
  url: ""
});

export const getConversationPostLoaderData = (
  imagesCount: number,
  commentsCount: number
): ConversationPost => {
  const { tags, text } = getMockTextAndTags();
  const images = new Array(imagesCount)
    .fill("")
    .map(getConversationImageLoaderData);

  return {
    isPinned: false,
    tags,
    comments: tableLoaderCreator(
      () => getConversationPostLoaderData(getRandomInteger(0, 2), 0),
      commentsCount
    ),
    id: uuid.v4(),
    images,
    author: managerLoaderData,
    date: new Date(),
    likesCount: getRandomInteger(1, 10),
    text,
    actions: getConversationPersonalDetailsLoaderData()
  };
};

export const getEmptyPostLoaderData = (): ConversationPost => ({
  isPinned: false,
  tags: [],
  comments: [],
  id: uuid.v4(),
  images: [],
  author: managerLoaderData,
  date: new Date(),
  likesCount: 0,
  text: "",
  actions: getConversationPersonalDetailsLoaderData()
});

export const getConversationPostListLoaderData = (): ConversationPost[] =>
  tableLoaderCreator(
    () =>
      getConversationPostLoaderData(
        getRandomInteger(0, 10),
        getRandomInteger(0, 5)
      ),
    getRandomInteger(2, 5)
  );
