import { EmptyIcon } from "@/components/icons";
import Flex from "@/components/ui/Flex";
import { Text } from "@/components/ui/Text";
import { TextSize } from "@/lib/enum";
import { cn } from "@/lib/utils";

type Props = {
  description?: string;
  className?: string;
  iconClassName?: string;
};

export const Empty = (props: Props) => {
  return (
    <Flex
      vertical={true}
      align={"center"}
      gap={8}
      className={cn("py-10", props.className)}
    >
      <EmptyIcon className={props.iconClassName} />
      <Text size={TextSize.SMALL} color={"var(--text-2)"}>
        {props.description ?? "Không có dữ liệu !"}
      </Text>
    </Flex>
  );
};
