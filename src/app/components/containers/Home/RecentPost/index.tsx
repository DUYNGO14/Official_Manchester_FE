/* eslint-disable @typescript-eslint/no-explicit-any */
import ListPost from '@/app/components/containers/Home/RecentPost/ListPost'
import SignPost from '@/app/components/containers/signpost'
import { Box, Container } from '@mui/material'
import React from 'react'

function RecentPost({listPost }: any) {
  const posts = [
    {
      id: 1,
      title: "Manchester United sắp công bố bản hợp đồng bom tấn",
      content:
        "Theo tin giả định, Quỷ Đỏ chuẩn bị chiêu mộ một tiền đạo hàng đầu châu Âu với mức phí kỷ lục.",
      date: "September 6, 2025",
      readTime: "4 min read",
      category: "Football",
      image: "https://image.plo.vn/w1000/Uploaded/2025/yqjvzdjwp/2025_08_15/su-that-dang-sau-vu-chuyen-nhuong-sesko-sang-mu-385-9516.jpg.webp",
    },
    {
      id: 2,
      title: "HLV Manchester United tiết lộ kế hoạch chiến thuật mới",
      content:
        "Trong buổi họp báo giả tưởng, HLV cho biết đội sẽ thử nghiệm sơ đồ tấn công hoàn toàn mới ở mùa giải tới.",
      date: "September 5, 2025",
      readTime: "6 min read",
      category: "Football",
      image: "https://cdn.24h.com.vn/upload/2-2025/images/2025-06-07/Fernandes-mu-amorim-743-copy-1749292345-115-width740height416.jpg",
    },
    {
      id: 3,
      title: "Quỷ Đỏ bất ngờ thay đổi kế hoạch chuyển nhượng",
      content:
        "Tin giả cho rằng CLB sẽ tập trung vào việc trẻ hóa lực lượng thay vì theo đuổi các ngôi sao lớn.",
      date: "September 4, 2025",
      readTime: "5 min read",
      category: "Transfer News",
      image: "https://picsum.photos/seed/mu3/1200/800",
    },
    {
      id: 4,
      title: "Manchester United ra mắt áo đấu đặc biệt",
      content:
        "Một mẫu áo đấu giới hạn, lấy cảm hứng từ lịch sử 150 năm của CLB, sẽ được tung ra trong tháng tới.",
      date: "September 3, 2025",
      readTime: "3 min read",
      category: "Club News",
      image: "https://picsum.photos/seed/mu4/1200/800",
    },
    {
      id: 5,
      title: "Fan MU gây sốt với màn chào đón đội tại Old Trafford",
      content:
        "Hàng ngàn CĐV đã giả tưởng tập trung bên ngoài sân vận động với màn cổ vũ cuồng nhiệt.",
      date: "September 2, 2025",
      readTime: "4 min read",
      category: "Fans",
      image: "https://picsum.photos/seed/mu5/1200/800",
    },
    {
      id: 6,
      title: "Cầu thủ trẻ MU gây ấn tượng trong buổi tập kín",
      content:
        "Một tài năng trẻ từ học viện được cho là đã ghi 3 bàn trong trận đấu tập nội bộ.",
      date: "September 1, 2025",
      readTime: "5 min read",
      category: "Academy",
      image: "https://picsum.photos/seed/mu6/1200/800",
    },
    {
      id: 7,
      title: "Manchester United cân nhắc mở tour du đấu châu Á",
      content:
        "Tin giả cho biết CLB đang bàn bạc để trở lại Việt Nam trong tour giao hữu 2026.",
      date: "August 31, 2025",
      readTime: "6 min read",
      category: "Club News",
      image: "https://picsum.photos/seed/mu7/1200/800",
    },
    {
      id: 8,
      title: "Nội bộ MU dậy sóng vì tin đồn chuyển nhượng",
      content:
        "Một số trụ cột được cho là không hài lòng trước kế hoạch chiêu mộ một ngôi sao cùng vị trí.",
      date: "August 30, 2025",
      readTime: "7 min read",
      category: "Rumors",
      image: "https://picsum.photos/seed/mu8/1200/800",
    },
    {
      id: 9,
      title: "MU cân nhắc đổi tên khán đài Stretford End",
      content:
        "Một thông tin giả khẳng định CLB có ý định bán quyền đặt tên cho một tập đoàn lớn.",
      date: "August 29, 2025",
      readTime: "4 min read",
      category: "Club Business",
      image: "https://picsum.photos/seed/mu9/1200/800",
    },
    {
      id: 10,
      title: "CĐV MU mở chiến dịch online đòi giữ chân ngôi sao",
      content:
        "Hàng chục nghìn người hâm mộ đã ký vào bản kiến nghị giả tưởng để giữ một cầu thủ không ra đi.",
      date: "August 28, 2025",
      readTime: "5 min read",
      category: "Fans",
      image: "https://picsum.photos/seed/mu10/1200/800",
    },
  ];  

  return (
    <Box sx={{ py: { md: 3, xs:1 } }}>
      <Container maxWidth="lg">
        <SignPost newTitle="Recent Post" showMore="Show More" href="/posts" />
        <ListPost posts={posts} />
      </Container>
    </Box>
  )
}

export default RecentPost
