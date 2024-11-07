year=int(input("연도를 입력하시오 : "))

monkey=0
chicken=1
dog=2
pig=3
mouse=4
cow=5
tiger=6
rabbit=7
dragon=8
snake=9
horse=10
sheep=11

answer=(year%12)

if answer==0:
    print("당신은 원숭이 띠 입니다")
elif answer==1:
    print("당신은 닭 띠 입니다")
elif answer==2:
    print("당신은 개 띠 입니다")
elif answer==3:
    print("당신은 돼지 띠 입니다")
elif answer==4:
    print("당신은 쥐 띠 입니다")
elif answer==5:
    print("당신은 소 띠 입니다")
elif answer==6:
    print("당신은 호랑이 띠 입니다")
elif answer==7:
    print("당신은 토끼 띠 입니다")
elif answer==8:
    print("당신은 용 띠 입니다")
elif answer==9:
    print("당신은 뱀 띠 입니다")
elif answer==10:
    print("당신은 말 띠 입니다")
else:
    print("당신은 양 띠 입니다")


##########################################

weight=float(input("당신의 몸무게(kg)은 얼마입니까?"))
height=float(input("당신의 키(m)는 몇 입니까?"))

bmi=round(weight/(height/100*height/100),2)

print(f"당신의 BMI는 {bmi} 입니다.")

if bmi<20:
    print("저체중입니다")
elif 20<=bmi<=24.9:
    print("정상입니다")
elif 25<=bmi<=29.9:
    print("과체중입니다")
else:
    print("비만입니다")
    
##########################################################

qick=int(input("배송지가 어디입니까(korea=1, usa=2)"))

price=int(input("상품 가격을 입력하시오 : "))

korea=1
usa=2

if qick==1:
   if price>=30000:
       print("배송비는 0원입니다")
   elif 10000<=price<30000:
       print("배송비는 1000원입니다")
   else:
       print("배송비는 3000원입니다")
else:
   if price>=30000:
       print("배송비는 5000원입니다")
   else:
       print("배송비는 10000원입니다")
       
       #############################
       
       