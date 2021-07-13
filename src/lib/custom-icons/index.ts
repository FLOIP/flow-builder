import {
  IconDefinition,
  IconName,
  IconPrefix,
} from '@fortawesome/fontawesome-common-types'

const audio: IconDefinition = {
  prefix: 'fac' as IconPrefix,
  iconName: 'audio' as IconName,
  icon: [
    32,
    32,
    [],
    'e001',
    'M21.118 12.441C20.8093 11.8235 20.0585 11.5732 19.441 11.882C18.8235 12.1907 18.5732 12.9415 18.882 13.559L21.118 12.441ZM18.882 20.441C18.5732 21.0585 18.8235 21.8093 19.441 22.118C20.0585 22.4268 20.8093 22.1765 21.118 21.559L18.882 20.441ZM25.118 8.44098C24.8093 7.82351 24.0585 7.57323 23.441 7.88197C22.8235 8.1907 22.5732 8.94154 22.882 9.55902L25.118 8.44098ZM22.882 24.441C22.5732 25.0585 22.8235 25.8093 23.441 26.118C24.0585 26.4268 24.8093 26.1765 25.118 25.559L22.882 24.441ZM10.4683 20.1414L11.1835 19.1161L11.1835 19.1161L10.4683 20.1414ZM14.4279 22.9034L15.143 21.8782L15.143 21.8782L14.4279 22.9034ZM14.3766 10.2941L13.5974 9.31673L13.5974 9.31673L14.3766 10.2941ZM10.4841 13.3973L9.70486 12.4199L9.70486 12.4199L10.4841 13.3973ZM20 13C18.882 13.559 18.8819 13.5588 18.8818 13.5586C18.8817 13.5585 18.8816 13.5583 18.8816 13.5582C18.8815 13.558 18.8814 13.5578 18.8813 13.5576C18.8811 13.5573 18.881 13.5571 18.8809 13.5569C18.8808 13.5567 18.8809 13.557 18.8813 13.5577C18.882 13.5591 18.8836 13.5624 18.886 13.5674C18.8909 13.5775 18.8991 13.5947 18.9102 13.6185C18.9325 13.6661 18.9661 13.7399 19.0073 13.8361C19.0901 14.0292 19.202 14.309 19.3141 14.6453C19.5433 15.3329 19.75 16.1891 19.75 17H22.25C22.25 15.8109 21.9567 14.6671 21.6859 13.8547C21.548 13.441 21.4099 13.0958 21.3052 12.8514C21.2527 12.7288 21.2082 12.6308 21.1757 12.5612C21.1595 12.5264 21.1462 12.4987 21.1364 12.4785C21.1315 12.4684 21.1275 12.4602 21.1244 12.4539C21.1229 12.4508 21.1216 12.4481 21.1205 12.446C21.12 12.4449 21.1195 12.4439 21.1191 12.4431C21.1189 12.4427 21.1187 12.4423 21.1185 12.442C21.1184 12.4418 21.1183 12.4415 21.1183 12.4414C21.1181 12.4412 21.118 12.441 20 13ZM19.75 17C19.75 17.8109 19.5433 18.6671 19.3141 19.3547C19.202 19.691 19.0901 19.9708 19.0073 20.1639C18.9661 20.2601 18.9325 20.3339 18.9102 20.3815C18.8991 20.4053 18.8909 20.4225 18.886 20.4326C18.8836 20.4376 18.882 20.4409 18.8813 20.4423C18.8809 20.443 18.8808 20.4433 18.8809 20.4431C18.881 20.4429 18.8811 20.4427 18.8813 20.4424C18.8814 20.4422 18.8815 20.442 18.8816 20.4418C18.8816 20.4417 18.8817 20.4415 18.8818 20.4414C18.8819 20.4412 18.882 20.441 20 21C21.118 21.559 21.1181 21.5588 21.1183 21.5586C21.1183 21.5585 21.1184 21.5582 21.1185 21.558C21.1187 21.5577 21.1189 21.5573 21.1191 21.5569C21.1195 21.5561 21.12 21.5551 21.1205 21.554C21.1216 21.5519 21.1229 21.5492 21.1244 21.5461C21.1275 21.5398 21.1315 21.5316 21.1364 21.5215C21.1462 21.5013 21.1595 21.4736 21.1757 21.4388C21.2082 21.3692 21.2527 21.2712 21.3052 21.1486C21.4099 20.9042 21.548 20.559 21.6859 20.1453C21.9567 19.3329 22.25 18.1891 22.25 17H19.75ZM24 9C22.882 9.55902 22.8819 9.55881 22.8818 9.55863C22.8817 9.55858 22.8817 9.55841 22.8816 9.55832C22.8815 9.55815 22.8815 9.55804 22.8815 9.55799C22.8814 9.55789 22.8815 9.55803 22.8817 9.5584C22.882 9.55915 22.8829 9.56085 22.8842 9.56348C22.8868 9.56875 22.8912 9.57774 22.8973 9.59035C22.9095 9.61557 22.9284 9.65521 22.9532 9.70829C23.0028 9.81452 23.0755 9.97429 23.1636 10.1799C23.3401 10.5917 23.577 11.184 23.8141 11.8953C24.2933 13.3329 24.75 15.1891 24.75 17H27.25C27.25 14.8109 26.7067 12.6671 26.1859 11.1047C25.923 10.316 25.6599 9.65827 25.4614 9.1951C25.362 8.96321 25.2785 8.77923 25.2187 8.65108C25.1888 8.58698 25.1648 8.53677 25.1477 8.50145C25.1391 8.48378 25.1323 8.46983 25.1273 8.45971C25.1248 8.45465 25.1228 8.45055 25.1212 8.44743C25.1205 8.44586 25.1198 8.44454 25.1193 8.44347C25.119 8.44293 25.1188 8.44246 25.1186 8.44204C25.1185 8.44183 25.1183 8.44157 25.1183 8.44147C25.1182 8.44122 25.118 8.44098 24 9ZM24.75 17C24.75 18.8109 24.2933 20.6671 23.8141 22.1047C23.577 22.816 23.3401 23.4083 23.1636 23.8201C23.0755 24.0257 23.0028 24.1855 22.9532 24.2917C22.9284 24.3448 22.9095 24.3844 22.8973 24.4097C22.8912 24.4223 22.8868 24.4313 22.8842 24.4365C22.8829 24.4392 22.882 24.4408 22.8817 24.4416C22.8815 24.442 22.8814 24.4421 22.8815 24.442C22.8815 24.442 22.8815 24.4418 22.8816 24.4417C22.8817 24.4416 22.8817 24.4414 22.8818 24.4414C22.8819 24.4412 22.882 24.441 24 25C25.118 25.559 25.1182 25.5588 25.1183 25.5585C25.1183 25.5584 25.1185 25.5582 25.1186 25.558C25.1188 25.5575 25.119 25.5571 25.1193 25.5565C25.1198 25.5555 25.1205 25.5541 25.1212 25.5526C25.1228 25.5494 25.1248 25.5453 25.1273 25.5403C25.1323 25.5302 25.1391 25.5162 25.1477 25.4986C25.1648 25.4632 25.1888 25.413 25.2187 25.3489C25.2785 25.2208 25.362 25.0368 25.4614 24.8049C25.6599 24.3417 25.923 23.684 26.1859 22.8953C26.7067 21.3329 27.25 19.1891 27.25 17H24.75ZM3.75 14.6154V18.9615H6.25V14.6154H3.75ZM6 21.2115H9.89621V18.7115H6V21.2115ZM9.75318 21.1666L13.7127 23.9286L15.143 21.8782L11.1835 19.1161L9.75318 21.1666ZM17.25 22.0832V11.0761H14.75V22.0832H17.25ZM13.5974 9.31673L9.70486 12.4199L11.2633 14.3747L15.1558 11.2716L13.5974 9.31673ZM9.8607 12.3654H6V14.8654H9.8607V12.3654ZM9.70486 12.4199C9.74914 12.3846 9.80408 12.3654 9.8607 12.3654V14.8654C10.3703 14.8654 10.8648 14.6924 11.2633 14.3747L9.70486 12.4199ZM17.25 11.0761C17.25 9.19123 15.0713 8.14179 13.5974 9.31673L15.1558 11.2716C14.9921 11.4021 14.75 11.2855 14.75 11.0761H17.25ZM13.7127 23.9286C15.2043 24.969 17.25 23.9018 17.25 22.0832H14.75C14.75 21.8811 14.9773 21.7625 15.143 21.8782L13.7127 23.9286ZM9.89621 21.2115C9.84506 21.2115 9.79513 21.1958 9.75318 21.1666L11.1835 19.1161C10.8059 18.8528 10.3566 18.7115 9.89621 18.7115V21.2115ZM3.75 18.9615C3.75 20.2042 4.75736 21.2115 6 21.2115V18.7115C6.13807 18.7115 6.25 18.8235 6.25 18.9615H3.75ZM6.25 14.6154C6.25 14.7535 6.13807 14.8654 6 14.8654V12.3654C4.75736 12.3654 3.75 13.3727 3.75 14.6154H6.25Z',
  ],
}

const enter: IconDefinition = {
  prefix: 'fac' as IconPrefix,
  iconName: 'enter' as IconName,
  icon: [
    17,
    20,
    [],
    'e002',
    'M1 9C0.447715 9 0 9.44772 0 10C0 10.5523 0.447715 11 1 11V9ZM11 11H12V9H11V11ZM7.99929 4.62347C7.63354 4.20965 7.00157 4.17068 6.58775 4.53643C6.17393 4.90218 6.13497 5.53414 6.50071 5.94796L7.99929 4.62347ZM11.4167 10L12.166 10.6622L12.7513 10L12.166 9.33775L11.4167 10ZM6.50071 14.052C6.13497 14.4659 6.17393 15.0978 6.58775 15.4636C7.00157 15.8293 7.63354 15.7904 7.99929 15.3765L6.50071 14.052ZM3.33333 3.14286C3.33333 3.69514 3.78105 4.14286 4.33333 4.14286C4.88562 4.14286 5.33333 3.69514 5.33333 3.14286H3.33333ZM5.33333 16.8571C5.33333 16.3049 4.88562 15.8571 4.33333 15.8571C3.78105 15.8571 3.33333 16.3049 3.33333 16.8571H5.33333ZM1 11H11V9H1V11ZM5.33333 3.14286V2H3.33333V3.14286H5.33333ZM5.33333 2H15V0H5.33333V2ZM15 2V18H17V2H15ZM15 18H5.33333V20H15V18ZM5.33333 18V16.8571H3.33333V18H5.33333ZM10.6674 9.33775L8.58405 11.6949L10.0826 13.0194L12.166 10.6622L10.6674 9.33775ZM8.58405 11.6949L6.50071 14.052L7.99929 15.3765L10.0826 13.0194L8.58405 11.6949ZM6.50071 5.94796L8.58405 8.3051L10.0826 6.98061L7.99929 4.62347L6.50071 5.94796ZM8.58405 8.3051L10.6674 10.6622L12.166 9.33775L10.0826 6.98061L8.58405 8.3051ZM5.33333 18H5.33333H3.33333C3.33333 19.1046 4.22877 20 5.33333 20V18ZM15 18V20C16.1046 20 17 19.1046 17 18H15ZM15 2H15H17C17 0.89543 16.1046 0 15 0V2ZM5.33333 2L5.33333 2V0C4.22876 0 3.33333 0.895431 3.33333 2H5.33333Z'
  ],
}

const recordAudio: IconDefinition = {
  prefix: 'fac' as IconPrefix,
  iconName: 'record-audio' as IconName,
  icon: [
    32,
    32,
    [],
    'e003',
    'M7.99805 13.9376C7.9636 13.3864 7.48883 12.9675 6.93762 13.0019C6.38641 13.0364 5.9675 13.5112 6.00195 14.0624L7.99805 13.9376ZM25.9981 14.0624C26.0325 13.5112 25.6136 13.0364 25.0624 13.0019C24.5112 12.9675 24.0364 13.3864 24.0019 13.9376L25.9981 14.0624ZM15 28C15 28.5523 15.4477 29 16 29C16.5523 29 17 28.5523 17 28H15ZM8 27C7.44772 27 7 27.4477 7 28C7 28.5523 7.44772 29 8 29V27ZM24 29C24.5523 29 25 28.5523 25 28C25 27.4477 24.5523 27 24 27V29ZM20 8V13H22V8H20ZM12 13V8H10V13H12ZM16 17C13.7909 17 12 15.2091 12 13H10C10 16.3137 12.6863 19 16 19V17ZM20 13C20 15.2091 18.2091 17 16 17V19C19.3137 19 22 16.3137 22 13H20ZM16 4C18.2091 4 20 5.79086 20 8H22C22 4.68629 19.3137 2 16 2V4ZM16 2C12.6863 2 10 4.68629 10 8H12C12 5.79086 13.7909 4 16 4V2ZM6.00195 14.0624C6.09611 15.5689 6.7059 17.7811 8.24207 19.6375C9.81064 21.5331 12.3011 23 16 23V21C12.8989 21 10.9727 19.8003 9.78293 18.3625C8.56077 16.8855 8.07056 15.0977 7.99805 13.9376L6.00195 14.0624ZM16 23C19.6989 23 22.1894 21.5331 23.7579 19.6375C25.2941 17.7811 25.9039 15.5689 25.9981 14.0624L24.0019 13.9376C23.9294 15.0977 23.4392 16.8855 22.2171 18.3625C21.0273 19.8003 19.1011 21 16 21V23ZM17 28V22H15V28H17ZM8 29H24V27H8V29Z'
  ],
}

const settings: IconDefinition = {
  prefix: 'fac' as IconPrefix,
  iconName: 'settings' as IconName,
  icon: [
    16,
    16,
    [],
    'e004',
    'M14.9757 7.00154L13.2241 5.81525L13.6254 3.73557C13.7015 3.34893 13.5785 2.95057 13.3002 2.66938C13.019 2.39111 12.6207 2.26809 12.2399 2.34424L10.1632 2.74553L8.97979 0.990993C8.53749 0.3378 7.45958 0.3378 7.01728 0.990993L5.83392 2.74553L3.76011 2.34424C3.37053 2.27102 2.9751 2.39111 2.69684 2.67231C2.41857 2.9535 2.29555 3.34893 2.3717 3.73557L2.77299 5.81525L1.02138 7.00154C0.693322 7.22415 0.5 7.59029 0.5 7.98572C0.5 8.38115 0.696251 8.74729 1.02138 8.96697L2.77299 10.1533L2.3717 12.2329C2.29555 12.6196 2.41857 13.0179 2.69684 13.2962C2.9751 13.5745 3.3676 13.6975 3.76011 13.6213L5.83392 13.2201L7.01728 14.9746C7.23697 15.3027 7.60603 15.4989 7.99854 15.4989C8.39104 15.4989 8.76011 15.3027 8.97979 14.9775L10.1632 13.223L12.2399 13.6243C12.6324 13.7034 13.0249 13.5774 13.3032 13.2991C13.5814 13.0209 13.7015 12.6225 13.6283 12.2359L13.227 10.1562L14.9786 8.9699C15.3037 8.75022 15.5 8.38115 15.5 7.98865C15.4971 7.59029 15.3037 7.22415 14.9757 7.00154ZM11.6687 9.50886L12.1842 12.1802L9.51875 11.6647L7.99854 13.9172L6.47832 11.6618L3.81576 12.1773L4.33128 9.50593L2.08172 7.98279L4.33128 6.45965L3.81576 3.7883L6.48125 4.30382L7.99854 2.05426L9.51875 4.30675L12.1842 3.79123L11.6687 6.45965L13.9183 7.98279L11.6687 9.50886ZM7.99854 4.95409C6.32015 4.95409 4.95226 6.32198 4.95226 8.00037C4.95226 9.67875 6.32015 11.0466 7.99854 11.0466C9.67692 11.0466 11.0448 9.67875 11.0448 8.00037C11.0448 6.32198 9.67692 4.95409 7.99854 4.95409ZM7.99854 9.64067C7.09344 9.64067 6.35823 8.90546 6.35823 8.00037C6.35823 7.09527 7.09344 6.36006 7.99854 6.36006C8.90363 6.36006 9.63884 7.09527 9.63884 8.00037C9.63884 8.90546 8.90363 9.64067 7.99854 9.64067Z'
  ],
}

const upload: IconDefinition = {
  prefix: 'fac' as IconPrefix,
  iconName: 'upload' as IconName,
  icon: [
    32,
    32,
    [],
    'e005',
    'M7 21V27H25V21M8 13L16 6M16 6L24 13M16 6V19',
  ],
}

const ussd: IconDefinition = {
  prefix: 'fac' as IconPrefix,
  iconName: 'ussd' as IconName,
  icon: [
    32,
    32,
    [],
    'e006',
    'M17.9279 23.5201L18.6005 24.2601L18.6005 24.2601L17.9279 23.5201ZM13 28H12V30.2606L13.6727 28.7399L13 28ZM13 23H14V22H13V23ZM13.25 11C13.25 10.4477 12.8023 10 12.25 10C11.6977 10 11.25 10.4477 11.25 11H13.25ZM11.25 17.5C11.25 18.0523 11.6977 18.5 12.25 18.5C12.8023 18.5 13.25 18.0523 13.25 17.5H11.25ZM10.659 11.2448C10.2685 10.8543 9.63532 10.8543 9.2448 11.2448C8.85427 11.6353 8.85427 12.2685 9.2448 12.659L10.659 11.2448ZM13.841 17.2552C14.2315 17.6457 14.8647 17.6457 15.2552 17.2552C15.6457 16.8647 15.6457 16.2315 15.2552 15.841L13.841 17.2552ZM9 13.25C8.44772 13.25 8 13.6977 8 14.25C8 14.8023 8.44772 15.25 9 15.25V13.25ZM15.5 15.25C16.0523 15.25 16.5 14.8023 16.5 14.25C16.5 13.6977 16.0523 13.25 15.5 13.25V15.25ZM15.2552 12.659C15.6457 12.2685 15.6457 11.6353 15.2552 11.2448C14.8647 10.8543 14.2315 10.8543 13.841 11.2448L15.2552 12.659ZM9.24479 15.841C8.85427 16.2315 8.85427 16.8647 9.24479 17.2552C9.63532 17.6457 10.2685 17.6457 10.659 17.2552L9.24479 15.841ZM20.9884 11.1521C21.0724 10.6062 20.6979 10.0956 20.1521 10.0116C19.6062 9.92765 19.0956 10.3021 19.0116 10.8479L20.9884 11.1521ZM18.0116 17.3479C17.9276 17.8938 18.3021 18.4044 18.8479 18.4884C19.3938 18.5724 19.9044 18.1979 19.9884 17.6521L18.0116 17.3479ZM23.9884 11.1521C24.0724 10.6062 23.6979 10.0956 23.1521 10.0116C22.6062 9.92765 22.0956 10.3021 22.0116 10.8479L23.9884 11.1521ZM21.0116 17.3479C20.9276 17.8938 21.3021 18.4044 21.8479 18.4884C22.3938 18.5724 22.9044 18.1979 22.9884 17.6521L21.0116 17.3479ZM18 12C17.4477 12 17 12.4477 17 13C17 13.5523 17.4477 14 18 14V12ZM24 14C24.5523 14 25 13.5523 25 13C25 12.4477 24.5523 12 24 12V14ZM18 15C17.4477 15 17 15.4477 17 16C17 16.5523 17.4477 17 18 17V15ZM24 17C24.5523 17 25 16.5523 25 16C25 15.4477 24.5523 15 24 15V17ZM7 6H26V4H7V6ZM27 7V21H29V7H27ZM6 21V7H4V21H6ZM26 22H19.2732V24H26V22ZM4 21C4 22.6569 5.34315 24 7 24V22C6.44771 22 6 21.5523 6 21H4ZM27 21C27 21.5523 26.5523 22 26 22V24C27.6569 24 29 22.6569 29 21H27ZM26 6C26.5523 6 27 6.44772 27 7H29C29 5.34315 27.6569 4 26 4V6ZM7 4C5.34315 4 4 5.34315 4 7H6C6 6.44772 6.44772 6 7 6V4ZM17.2552 22.7802L12.3273 27.2601L13.6727 28.7399L18.6005 24.2601L17.2552 22.7802ZM14 28V23H12V28H14ZM19.2732 22C18.5269 22 17.8074 22.2782 17.2552 22.7802L18.6005 24.2601C18.7846 24.0927 19.0244 24 19.2732 24V22ZM11.25 11V14.25H13.25V11H11.25ZM11.25 14.25V17.5H13.25V14.25H11.25ZM9.2448 12.659L11.5429 14.9571L12.9571 13.5429L10.659 11.2448L9.2448 12.659ZM11.5429 14.9571L13.841 17.2552L15.2552 15.841L12.9571 13.5429L11.5429 14.9571ZM9 15.25H12.25V13.25H9V15.25ZM12.25 15.25H15.5V13.25H12.25V15.25ZM13.841 11.2448L11.5429 13.5429L12.9571 14.9571L15.2552 12.659L13.841 11.2448ZM11.5429 13.5429L9.24479 15.841L10.659 17.2552L12.9571 14.9571L11.5429 13.5429ZM19.0116 10.8479L18.7039 12.8479L20.6807 13.1521L20.9884 11.1521L19.0116 10.8479ZM18.7039 12.8479L18.2424 15.8479L20.2191 16.1521L20.6807 13.1521L18.7039 12.8479ZM18.2424 15.8479L18.0116 17.3479L19.9884 17.6521L20.2191 16.1521L18.2424 15.8479ZM22.0116 10.8479L21.7039 12.8479L23.6807 13.1521L23.9884 11.1521L22.0116 10.8479ZM21.7039 12.8479L21.2424 15.8479L23.2191 16.1521L23.6807 13.1521L21.7039 12.8479ZM21.2424 15.8479L21.0116 17.3479L22.9884 17.6521L23.2191 16.1521L21.2424 15.8479ZM18 14H19.6923V12H18V14ZM19.6923 14H22.6923V12H19.6923V14ZM22.6923 14H24V12H22.6923V14ZM18 17H19.2308V15H18V17ZM19.2308 17H22.2308V15H19.2308V17ZM22.2308 17H24V15H22.2308V17ZM13 22H7V24H13V22Z',
  ],
}

export default [
  audio,
  enter,
  recordAudio,
  settings,
  upload,
  ussd,
]
