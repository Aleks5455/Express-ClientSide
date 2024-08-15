import { Button, Card, Image, useDisclosure } from "@nextui-org/react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { resetUser, selectCurrent } from "../../features/user/userSlice"
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "../../app/services/userApi"
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../app/services/followApi"
import { useEffect } from "react"
import { BackArrow } from "../../components/backArrow"
import { BASE_URL } from "../../constants"
import {
  MdOutlinePersonAddAlt1,
  MdOutlinePersonAddDisabled,
} from "react-icons/md"
import { CiEdit } from "react-icons/ci"
import { ProfileInfo } from "../../components/profile-info"
import { formatDate } from "../../utils/formatDate"
import { CountInfo } from "../../components/count-info"
import { EditProfile } from "../../components/editProfile"

export const UserProfile = () => {
  const { id } = useParams<{ id: string }>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const currentUser = useAppSelector(selectCurrent)
  const { data } = useGetUserByIdQuery(id ?? "")
  const [followUser] = useFollowUserMutation()
  const [unfollowUser] = useUnfollowUserMutation()
  const [triggerGetUserById] = useLazyGetUserByIdQuery()
  const [triggerCurrent] = useLazyCurrentQuery()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(resetUser())
  }, [])

  const handleFollow = async () => {
    try {
      if (id) {
        data?.isFollowing
          ? await unfollowUser(id).unwrap()
          : await followUser({ followingId: id }).unwrap()

        await triggerGetUserById(id)
        await triggerCurrent()
      }
    } catch (error) {
      console.log("asd")
    }
  }
  const handleClose = async () => {
    try {
      if (id) {
        await triggerGetUserById(id)
        await triggerCurrent()
        onClose()
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (!data) return null

  return (
    <>
      <BackArrow />
      <div className="flex flex-col md:flex-row items-center gap-4 ">
        <Card className="flex flex-col items-center text-center space-y-4 p-5">
          <Image
            src={`${BASE_URL}${data?.avatarUrl}`}
            alt={data.name}
            width={200}
            height={200}
            className="border-4 border-white"
          />
          <div className="flex flex-col text-2xl font-bold gap-4 items-center">
            {data.name}
            {currentUser?.id !== id ? (
              <Button
                color={data.isFollowing ? "default" : "primary"}
                variant="flat"
                className="gap-2"
                onClick={handleFollow}
                endContent={
                  data.isFollowing ? (
                    <MdOutlinePersonAddDisabled />
                  ) : (
                    <MdOutlinePersonAddAlt1 />
                  )
                }
              >
                {data.isFollowing ? "Unfollow" : "Follow"}
              </Button>
            ) : (
              <Button endContent={<CiEdit />} onClick={() => onOpen()}>
                Edit
              </Button>
            )}
          </div>
        </Card>
        <Card className="flex flex-col items-center space-y-4 p-5 flex-1">
          <ProfileInfo title="Email:" info={data.email} />
          <ProfileInfo title="Location:" info={data.location} />
          <ProfileInfo title="Birthday:" info={formatDate(data.dateOfBirth)} />
          <ProfileInfo title="About:" info={data.bio} />

          <div className="flex gap-2">
            <CountInfo count={data.followers.length} title="Followers" />
            <CountInfo count={data.following.length} title="Followings" />
          </div>
        </Card>
      </div>
      <EditProfile isOpen={isOpen} onClose={handleClose} user={data} />
    </>
  )
}
