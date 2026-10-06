import React from "react";

export const questionsDb = {
    'partA1': [
      { id: 'A1', text: 'Hệ thống AI có được định danh và mô tả chức năng rõ ràng bằng văn bản không?', options: ['Có', 'Không'], required: true },
      { id: 'A2', text: 'Vai trò của tổ chức đối với hệ thống này (Phát triển/Triển khai/Người dùng) đã được xác định chưa?', options: ['Có', 'Không'], required: true },
      { id: 'A3', text: 'Hệ thống AI này được phân loại theo loại công nghệ nào (ML truyền thống, học sâu, LLM/GenAI, GPAI, hệ thống lai) đã được ghi nhận rõ chưa?', options: ['Có', 'Không'], required: true },
      { id: 'A4', text: 'Hệ thống AI đang ở giai đoạn nào của vòng đời (NCKH cơ bản, phát triển, thử nghiệm, sản xuất, ngừng) đã được mô tả chưa?', options: ['Có', 'Không'], required: true },
      { id: 'A5', text: 'Nếu hệ thống dùng AI từ bên thứ ba, đã liệt kê đầy đủ các thành phần AI bên ngoài chưa?', options: ['Có', 'Không'], required: true }
    ],
    'partA2': [
      { id: 'A6', text: 'Đầu vào - đầu ra của hệ thống đã được mô tả rõ ràng chưa? (loại dữ liệu, định dạng, biên giới)', options: ['Có', 'Không'], required: true },
      { id: 'A7', text: 'Hệ thống có được sử dụng để đưa ra các quyết định hành chính, cấp phép không?', options: ['Có', 'Không'], required: true },
      { id: 'A8', text: 'Quyết định của AI có ảnh hưởng đến các nhóm yếu thế, nhóm dễ tổn thương không? (trẻ em, người cao tuổi, người khuyết tật, dân tộc thiểu số)?', options: ['Có', 'Không'], required: true },
      { id: 'A9', text: 'Hệ thống có thu thập và xử lý dữ liệu cá nhân nhạy cảm (sinh trắc, y tế) không?', options: ['Có', 'Không'], required: true },
      { id: 'A10', text: 'Phạm vi sử dụng của hệ thống là cục bộ hay trên quy mô toàn quốc?', options: ['Cục bộ', 'Toàn quốc', 'Cả hai'], required: true }
    ],
    'partA3': [
      { id: 'A11', text: <>Hệ thống có thuộc Danh mục AI rủi ro cao theo Điều 13 Luật 134/2025/QH15 và <a href="https://thuvienphapluat.vn/van-ban/Cong-nghe-thong-tin/Quyet-dinh-33-2026-QD-TTg-Danh-muc-he-thong-tri-tue-nhan-tao-co-rui-ro-cao-712969.aspx" target="_blank" rel="noreferrer" className="text-primary hover:underline" onClick={(e) => e.stopPropagation()}>Quyết định 33/2026/QĐ-TTg</a> ban hành vào ngày 30/06/2026 hay không?</>, options: ['Có', 'Không'], required: true },
      { id: 'A12', text: <>Nếu thuộc Danh mục AI rủi ro cao theo Điều 13 Luật 134/2025/QH15 và <a href="https://thuvienphapluat.vn/van-ban/Cong-nghe-thong-tin/Quyet-dinh-33-2026-QD-TTg-Danh-muc-he-thong-tri-tue-nhan-tao-co-rui-ro-cao-712969.aspx" target="_blank" rel="noreferrer" className="text-primary hover:underline" onClick={(e) => e.stopPropagation()}>Quyết định 33/2026/QĐ-TTg</a> ban hành, đã thực hiện đánh giá sự phù hợp theo Điều 13 chưa?</>, options: ['Có', 'Không'], required: true },
      { id: 'A13', text: 'Hệ thống có nguy cơ gây thiệt hại về vật chất, tính mạng hoặc an ninh trật tự không?', options: ['Có', 'Không'], required: true },
      { id: 'A14', text: 'Nếu hệ thống đưa ra kết quả sai, những tác động tiêu cực lên người dân có dễ dàng khắc phục được không?', options: ['Có', 'Không'], required: true },
      { id: 'A15', text: 'Có rủi ro rò rỉ dữ liệu hoặc xâm phạm nghiêm trọng đến quyền riêng tư không?', options: ['Có', 'Không'], required: true }
    ],
    'partB': [
      { id: 'B1', text: 'Tổ chức có văn bản phân công Lãnh đạo cấp cao chịu trách nhiệm về đạo đức AI chưa?', options: ['Có', 'Không'], required: true },
      { id: 'B2', text: 'Tổ chức đã thiết lập đội nhóm hoặc cá nhân chuyên trách theo dõi vòng đời quản trị AI chưa?', options: ['Có', 'Không'], required: true },
      { id: 'B3', text: 'Tổ chức có danh mục đầy đủ các hệ thống AI đang sử dụng không?', options: ['Có', 'Không'], required: true },
      { id: 'B4', text: 'Tài liệu mô tả có ghi rõ giới hạn sử dụng (những gì AI không được làm) và có được ban hành thành văn bản không?', options: ['Có', 'Không'], required: true },
      { id: 'B5', text: 'Quá trình phân loại rủi ro có được tài liệu hóa và có sự tham gia của bộ phận pháp chế không?', options: ['Có', 'Không'], required: true },
      { id: 'B6', text: 'Mỗi hệ thống AI có cơ chế giám sát của con người được tài liệu hóa không?', options: ['Có', 'Không'], required: true },
      { id: 'B7', text: 'Tổ chức có đầu mối tiếp nhận phản ánh/sự cố công khai không? (email, đường dây nóng, biểu mẫu). Có quy trình rõ ràng về thời gian phản hồi khi người dân khiếu nại quyết định của AI không?', options: ['Có', 'Không'], required: true },
      { id: 'B8', text: 'Tổ chức có hồ sơ dữ liệu cho mỗi hệ thống AI (nguồn gốc, chất lượng, biện pháp bảo mật) và đánh giá tác động quyền riêng tư không?', options: ['Có', 'Không'], required: true },
      { id: 'B9', text: 'Tổ chức có quy trình đánh giá nhà cung cấp AI trước khi ký hợp đồng không? Hợp đồng với nhà cung cấp AI có điều khoản về trách nhiệm chia sẻ, cập nhật, sự cố không?', options: ['Có', 'Không'], required: true }
    ],
    'partC1': [
      { id: 'C1.1', groupTitle: 'Thiết kế an toàn', text: 'Tổ chức đã lập danh mục và hồ sơ về các rủi ro gây hại tiềm tàng của hệ thống AI, bao gồm cả các tình huống bị lạm dụng hoặc sử dụng sai mục đích chưa?', options: ['Có', 'Không'], required: true },
      { id: 'C1.2', text: 'Hệ thống AI có được thiết kế với nguyên tắc an toàn từ đầu, trong đó các biện pháp phòng ngừa rủi ro được tích hợp ngay trong quá trình phát triển không?', options: ['Có', 'Không'], required: true },
      { id: 'C1.3', text: 'Có kế hoạch dự phòng và phục hồi khi hệ thống AI gặp sự cố hoặc tạo ra kết quả sai không?', options: ['Có', 'Không'], required: true },
      { id: 'C1.4', text: 'Hệ thống AI có các cơ chế để dừng hoạt động khẩn cấp khi cần thiết không?', options: ['Có', 'Không'], required: true },
      { id: 'C1.5', text: 'Tổ chức có thực hiện phân tích rủi ro bảo mật an toàn thông tin và kiểm thử xâm nhập cho hệ thống AI không?', options: ['Có', 'Không'], required: true },
      { id: 'C1.6', groupTitle: 'Kiểm thử và xác nhận chất lượng', text: 'Hệ thống AI đã được kiểm thử toàn diện trước khi triển khai, bao gồm kiểm thử mô hình trên dữ liệu Việt Nam đại diện cho các nhóm chịu tác động không?', options: ['Có', 'Không'], required: true },
      { id: 'C1.7', text: 'Tổ chức có quy trình kiểm thử chấp nhận độc lập với đội ngũ phát triển không?', options: ['Có', 'Không'], required: true },
      { id: 'C1.8', text: 'Hệ thống AI có được kiểm tra khả năng kháng cự tấn công đối kháng nhằm chống lại các nỗ lực thao túng thuật toán không?', options: ['Có', 'Không'], required: true },
      { id: 'C1.9', text: 'Kết quả kiểm thử được tài liệu hóa và lưu trữ để phục vụ kiểm tra/thanh tra trong suốt vòng đời dự án không?', options: ['Có', 'Không'], required: true },
      { id: 'C1.10', text: 'Các lỗi, sự cố được phát hiện trong quá trình kiểm thử có được ghi chép và theo dõi đến khi giải quyết hoàn toàn không?', options: ['Có', 'Không'], required: true },
      { id: 'C1.11', groupTitle: 'Giám sát và quản lý sự cố', text: 'Tổ chức có hệ thống giám sát hiệu suất AI liên tục sau khi triển khai không?', options: ['Có', 'Không'], required: true },
      { id: 'C1.12', text: 'Có ngưỡng cảnh báo được thiết lập để phát hiện khi AI hoạt động bất thường (như sai lệch về dữ liệu hoặc suy giảm hiệu suất mô hình) không?', options: ['Có', 'Không'], required: true },
      { id: 'C1.13', text: 'Tổ chức có quy trình phân loại và xử lý sự cố AI rõ ràng không?', options: ['Có', 'Không'], required: true },
      { id: 'C1.14', text: 'Tổ chức có cơ chế báo cáo sự cố nghiêm trọng lên cơ quan có thẩm quyền trong thời hạn quy định (ví dụ 72 giờ) không?', options: ['Có', 'Không'], required: true },
      { id: 'C1.15', text: 'Sau mỗi sự cố, tổ chức có thực hiện phân tích nguyên nhân gốc rễ và cập nhật biện pháp phòng ngừa không?', options: ['Có', 'Không'], required: true }
    ],
    'partC2': [
      { id: 'C2.1', groupTitle: 'Kiểm soát của con người', text: 'Hệ thống AI có áp dụng mô hình đảm bảo con người là bên đưa ra quyết định cuối cùng hoặc có quyền can thiệp kịp thời vào các kết quả sai lệch của AI gây ảnh hưởng ảnh hưởng đến quyền lợi người dân không?', options: ['Có', 'Không'], required: true },
      { id: 'C2.2', text: 'Người vận hành AI có được đào tạo đầy đủ về khả năng và giới hạn của hệ thống, cũng như về nghĩa vụ can thiệp khi cần thiết không?', options: ['Có', 'Không'], required: true },
      { id: 'C2.3', text: 'AI có bị sử dụng để thay thế hoàn toàn phán đoán của con người trong các quyết định hành chính quan trọng (cấp phép, xử lý vi phạm, phân bổ nguồn lực công) không?', options: ['Có', 'Không'], required: true },
      { id: 'C2.4', text: 'Người dùng/người dân có quyền yêu cầu con người xem xét lại quyết định do AI đề xuất không?', options: ['Có', 'Không'], required: true },
      { id: 'C2.5', text: 'Tổ chức có cơ chế đảm bảo rằng sự kiểm soát của con người là thực chất, không chỉ mang tính hình thức (nghĩa là người duyệt thực sự hiểu và có thể thay đổi kết quả của AI) không?', options: ['Có', 'Không'], required: true },
      { id: 'C2.6', groupTitle: 'Minh bạch và khả năng giải thích', text: 'Người dùng/người dân có được thông báo rõ ràng và dễ hiểu khi họ đang tương tác với hoặc bị ảnh hưởng bởi một hệ thống AI không?', options: ['Có', 'Không'], required: true },
      { id: 'C2.7', text: 'Tổ chức có khả năng cung cấp giải thích hợp lý về cơ sở và lý do đằng sau các quyết định quan trọng do AI đưa ra cho người bị ảnh hưởng không?', options: ['Có', 'Không'], required: true },
      { id: 'C2.8', text: 'Hệ thống có cơ chế lưu vết đầy đủ để truy xuất lại lịch sử quyết định trong tối thiểu 3 năm không?', options: ['Có', 'Không'], required: true },
      { id: 'C2.9', text: 'Thông tin về mục đích, phạm vi và hạn chế của hệ thống AI có được công bố công khai ở mức độ phù hợp cho người dân tiếp cận không?', options: ['Có', 'Không'], required: true },
      { id: 'C2.10', text: <>Tổ chức có <i>tài liệu kỹ thuật/ thẻ mô hình/ thẻ hệ thống</i> đủ chi tiết để cơ quan kiểm toán/thanh tra có thể hiểu và xem xét hoạt động của hệ thống không?</>, options: ['Có', 'Không'], required: true },
      { id: 'C2.11', groupTitle: 'Phòng chống phân biệt đối xử và thiên lệch', text: 'Dữ liệu huấn luyện AI có được đánh giá tính đại diện và kiểm tra thiên lệch trước khi sử dụng cho hệ thống thực không?', options: ['Có', 'Không'], required: true },
      { id: 'C2.12', text: 'Hệ thống AI có được kiểm tra định kỳ về hiệu suất phân biệt trên các nhóm nhân khẩu học khác nhau (giới tính, dân tộc, vùng miền, độ tuổi) không?', options: ['Có', 'Không'], required: true },
      { id: 'C2.13', text: 'Khi phát hiện thiên lệch, tổ chức có quy trình để đánh giá nguyên nhân, xác định tác động và thực hiện biện pháp khắc phục kịp thời không?', options: ['Có', 'Không'], required: true },
      { id: 'C2.14', text: 'Hệ thống AI có tuân thủ các quy định về bảo vệ dữ liệu cá nhân (thu thập tối thiểu, đúng mục đích, bảo mật) không?', options: ['Có', 'Không'], required: true },
      { id: 'C2.15', text: 'Người dùng/người dân có được cung cấp cơ chế khiếu nại và yêu cầu chỉnh sửa khi họ tin rằng quyết định của AI là không công bằng hoặc không chính xác không?', options: ['Có', 'Không'], required: true }
    ],
    'partC3': [
      { id: 'C3.1', groupTitle: 'Lợi ích xã hội và bao trùm kỹ thuật số', text: 'Tổ chức đã xác định rõ ràng và có thể đo lường được các lợi ích xã hội cụ thể mà hệ thống AI mang lại cho người dân và cộng đồng không?', options: ['Có', 'Không'], required: true },
      { id: 'C3.2', text: 'Hệ thống AI có được thiết kế và kiểm thử để đảm bảo người dùng có năng lực kỹ thuật số hạn chế (người cao tuổi, người ở vùng nông thôn, vùng sâu vùng xa) vẫn có thể tiếp cận dịch vụ không?', options: ['Có', 'Không'], required: true },
      { id: 'C3.3', text: 'Có cung cấp hệ thống bằng nhiều ngôn ngữ (Việt, Anh, ngôn ngữ dân tộc thiểu số chính) không?', options: ['Có', 'Không'], required: true },
      { id: 'C3.4', text: 'Hệ thống AI có được thiết kế và kiểm tra để tôn trọng các giá trị văn hóa, thuần phong mỹ tục và bản sắc dân tộc của Việt Nam không?', options: ['Có', 'Không'], required: true },
      { id: 'C3.5', text: 'Có cơ chế phát hiện và xử lý các nội dung không phù hợp với chuẩn mực văn hóa và pháp luật Việt Nam không?', options: ['Có', 'Không'], required: true },
      { id: 'C3.6', groupTitle: 'Thiết kế bao trùm và giảm khoảng cách số', text: 'Tổ chức có đánh giá nguy cơ hệ thống AI làm tăng khoảng cách số giữa các nhóm dân cư không, và có biện pháp giảm thiểu nếu phát hiện nguy cơ đó không?', options: ['Có', 'Không'], required: true },
      { id: 'C3.7', text: 'Có kế hoạch hỗ trợ người lao động bị ảnh hưởng bởi tự động hóa AI (đào tạo kỹ năng mới, chuyển đổi vai trò, thăng tiến nghề nghiệp) không?', options: ['Có', 'Không'], required: true },
      { id: 'C3.8', text: 'Người lao động sử dụng hoặc bị giám sát bởi AI có được tham khảo ý kiến một cách thực chất trong quá trình thiết kế và triển khai hệ thống không?', options: ['Có', 'Không'], required: true },
      { id: 'C3.9', text: 'AI có được dùng để giám sát hiệu suất nhân viên một cách không minh bạch, xâm phạm phẩm giá hoặc vượt quá mức cần thiết không?', options: ['Có', 'Không'], required: true },
      { id: 'C3.10', text: 'Tổ chức có chương trình nâng cao năng lực nhận thức về AI cho toàn thể cán bộ, viên chức, không chỉ riêng bộ phận CNTT không?', options: ['Có', 'Không'], required: true },
      { id: 'C3.11', groupTitle: 'Tác động đến môi trường và tính bền vững', text: 'Tổ chức có đánh giá mức tiêu thụ năng lượng và tác động môi trường liên quan đến việc xây dựng, huấn luyện và vận hành hệ thống AI không?', options: ['Có', 'Không'], required: true },
      { id: 'C3.12', text: 'Có biện pháp kỹ thuật hoặc vận hành để tối ưu hóa và giảm tiêu thụ tài nguyên tính toán của hệ thống AI không?', options: ['Có', 'Không'], required: true },
      { id: 'C3.13', text: 'Tổ chức có cân nhắc yếu tố tác động môi trường trong quyết định lựa chọn hạ tầng hệ thống AI (điện toán đám mây sử dụng năng lượng tái tạo, máy chủ hiệu suất cao...) không?', options: ['Có', 'Không'], required: true },
      { id: 'C3.14', text: 'Khi hệ thống AI được ứng dụng trong lĩnh vực có ảnh hưởng đến tài nguyên thiên nhiên hoặc môi trường, có cơ chế giám sát và báo cáo tác động môi trường không?', options: ['Có', 'Không'], required: true },
      { id: 'C3.15', text: 'Chính sách AI của tổ chức có đề cập đến cam kết và trách nhiệm về môi trường trong phát triển và sử dụng AI không?', options: ['Có', 'Không'], required: true }
    ],
    'partC4': [
      { id: 'C4.1', groupTitle: 'Đổi mới có trách nhiệm', text: 'Tổ chức có tích hợp quy trình đánh giá đạo đức ngay từ giai đoạn lên ý tưởng và thiết kế hệ thống AI không hoặc chỉ sau khi triển khai không?', options: ['Có', 'Không'], required: true },
      { id: 'C4.2', text: 'Khi thử nghiệm AI trong môi trường thực tế, có cơ chế kiểm soát phạm vi thử nghiệm, thời hạn và biện pháp bảo vệ người tham gia thử nghiệm không?', options: ['Có', 'Không'], required: true },
      { id: 'C4.3', text: 'Trách nhiệm của các bên (NPT/NCC/BTK/NSD) có được phân định rõ trong hợp đồng không?', options: ['Có', 'Không'], required: true },
      { id: 'C4.4', text: 'Kết quả nghiên cứu và kinh nghiệm thực tiễn trong triển khai AI có được chia sẻ (trong phạm vi an toàn thông tin) với các cơ quan, tổ chức khác để cùng học hỏi không?', options: ['Có', 'Không'], required: true },
      { id: 'C4.5', text: 'Tổ chức có tích cực tham gia vào các diễn đàn, cơ chế chia sẻ kinh nghiệm quản trị AI cấp quốc gia và khu vực không?', options: ['Có', 'Không'], required: true },
      { id: 'C4.6', groupTitle: 'Trách nhiệm giải trình và năng lực quản trị', text: 'Trách nhiệm giải trình cho từng hệ thống AI có được phân định rõ ràng trong văn bản pháp lý nội bộ (quy chế, quy trình vận hành chuẩn) không?', options: ['Có', 'Không'], required: true },
      { id: 'C4.7', text: 'Tổ chức có kế hoạch đào tạo định kỳ về đạo đức và quản trị AI cho cán bộ quản lý cấp trung và người vận hành AI không?', options: ['Có', 'Không'], required: true },
      { id: 'C4.8', text: 'Người ra quyết định về triển khai hoặc mở rộng AI có đủ hiểu biết thực chất về năng lực, giới hạn và rủi ro cụ thể của các hệ thống họ chịu trách nhiệm không?', options: ['Có', 'Không'], required: true },
      { id: 'C4.9', text: 'Tổ chức có quy trình cập nhật chính sách AI khi có thay đổi về pháp luật, tiêu chuẩn kỹ thuật quốc tế hoặc thực tiễn tốt nhất trong ngành không?', options: ['Có', 'Không'], required: true },
      { id: 'C4.10', text: 'Khi xảy ra sự cố hoặc thiệt hại do AI gây ra, tổ chức có cơ chế xác định trách nhiệm pháp lý, bồi thường thiệt hại cho bên bị ảnh hưởng không?', options: ['Có', 'Không'], required: true },
      { id: 'C4.11', groupTitle: 'Hợp tác và phát triển hệ sinh thái AI', text: 'Tổ chức có tham gia đóng góp ý kiến vào quá trình xây dựng và cập nhật các tiêu chuẩn, hướng dẫn quốc gia về AI không?', options: ['Có', 'Không'], required: true },
      { id: 'C4.12', text: 'Tổ chức có hợp tác với các cơ sở nghiên cứu, trường đại học trong việc đánh giá độc lập và cải tiến hệ thống AI không?', options: ['Có', 'Không'], required: true },
      { id: 'C4.13', text: 'Tổ chức có đóng góp hoặc tài trợ cho việc phát triển tập dữ liệu tiếng Việt và các mô hình AI phù hợp với ngữ cảnh Việt Nam không?', options: ['Có', 'Không'], required: true },
      { id: 'C4.14', text: 'Tổ chức có cơ chế tiếp nhận ý kiến phản hồi của công chúng về cách AI được sử dụng trong dịch vụ công, và có xem xét nghiêm túc các ý kiến đó không?', options: ['Có', 'Không'], required: true },
      { id: 'C4.15', text: 'Tổ chức có công khai định kỳ (ít nhất hàng năm) một báo cáo minh bạch về việc sử dụng AI, bao gồm các sự cố đã xảy ra và biện pháp khắc phục không?', options: ['Có', 'Không'], required: true }
    ],
    'partD': [
      { id: 'D1', text: 'Kế hoạch giảm thiểu rủi ro có được xây dựng thành văn bản chính thức với biện pháp cụ thể, người chịu trách nhiệm và thời hạn hoàn thành không? chỉ sau khi triển khai không?', options: ['Có', 'Không'], required: true },
      { id: 'D2', text: 'Các biện pháp giảm thiểu đã được ưu tiên hóa theo mức độ nghiêm trọng của rủi ro và tính khả thi triển khai không?', options: ['Có', 'Không'], required: true },
      { id: 'D3', text: 'Có nguồn lực (nhân sự, ngân sách, công cụ kỹ thuật) được phân bổ cụ thể để thực hiện Kế hoạch giảm thiểu rủi ro không?', options: ['Có', 'Không'], required: true },
      { id: 'D4', text: 'Hệ thống giám sát sau triển khai (KPI, cảnh báo, log) đã được thiết lập và kiểm tra hoạt động trước khi AI đi vào vận hành chính thức không?', options: ['Có', 'Không'], required: true },
      { id: 'D5', text: 'Có quy trình phân tích và báo cáo kết quả giám sát định kỳ lên lãnh đạo và cơ quan quản lý có thẩm quyền không?', options: ['Có', 'Không'], required: true },
      { id: 'D6', text: 'Lịch đánh giá lại toàn diện đã được đưa vào kế hoạch công tác chính thức của tổ chức không?', options: ['Có', 'Không'], required: true },
      { id: 'D7', text: 'Quy trình cập nhật kết quả tự đánh giá khi có thay đổi lớn về hệ thống, dữ liệu, pháp luật hoặc khi xảy ra sự cố đã được xác định không?', options: ['Có', 'Không'], required: true },
      { id: 'D8', text: 'Tất cả hồ sơ tự đánh giá, bằng chứng và kế hoạch khắc phục có được lưu trữ an toàn trong thời gian tối thiểu theo quy định (ít nhất 3 năm) không?', options: ['Có', 'Không'], required: true },
      { id: 'D9', text: 'Tổ chức có cam kết và cơ chế để chia sẻ bài học kinh nghiệm từ quá trình tự đánh giá với các đơn vị khác trong ngành/bộ/tỉnh không?', options: ['Có', 'Không'], required: true },
      { id: 'D10', text: 'Toàn bộ quá trình tự đánh giá (từ Phần A đến Phần D) có được lãnh đạo cấp cao ký xác nhận và chịu trách nhiệm về tính trung thực của kết quả không?', options: ['Có', 'Không'], required: true }
    ]
  };
