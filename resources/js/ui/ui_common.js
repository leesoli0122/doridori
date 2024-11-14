/*******************************************************************
    ajax 쓰는 거 아니면 funtion ~() {} 안에 있는 것만 가져가도 됌
*******************************************************************/
$(document).ready(function () {
    // 이벤트 위임 사용 (더 구체적인 부모 요소인 #container 기준)
    $(document).on('click', '.list-wrap .item a, .breadcrumb-wrap ul li a', function (e) {
        e.preventDefault();  // 기본 동작(페이지 이동) 방지
        const href = $(this).attr('href');
        // console.log("링크 클릭됨:", href);

        // 콘텐츠 로드
        loadContent(href);
    });

    // AJAX로 콘텐츠 로드
    function loadContent(url) {
        $('#contentWrap').load(url + ' #contentWrap > *', function (response, status) {
            if (status === 'error') {
                alert('페이지를 로드할 수 없습니다.');
            } else {
                // console.log("콘텐츠 로드 완료:", url);
                // AJAX로 로드된 콘텐츠에서 필요한 부분만 업데이트
                updatePageTitle();
                bindEvents();  // AJAX 후 이벤트 재바인딩
            }
        });
    }

    // 페이지 제목 업데이트
    function updatePageTitle() {
        const newTitle = $('#contentWrap').find('.text-wrap h2').text();
        if (newTitle) {
            $('.subvisual-wrap .text-wrap h2').text(newTitle);
        }
    }

    // 툴팁 및 탭 이벤트 재바인딩
    function bindEvents() {
        bindTooltipEvents();
        bindTabEvents();
    }

    /*********************************************************************
		tooltip 툴팁
	*********************************************************************/
    function bindTooltipEvents() {
        $(document).off('click', '.info-tooltip').on('click', '.info-tooltip', function () {
            const $this = $(this).closest(".tooltip-wrap");
            $this.toggleClass('on');
        });

        $(document).off('click', '.tooltip-close').on('click', '.tooltip-close', function () {
            const $this = $(this).closest(".tooltip-wrap");
            $this.removeClass('on');
        });
    }

    /*********************************************************************
		tab-item 탭
	*********************************************************************/
    function bindTabEvents() {
        $(document).off('click', '.tab-item > li').on('click', '.tab-item > li', function () {
            const selectedTab = $(this).attr("data-tab");
            const tabContents = $(this).closest(".tabs-wrap").find(".tab-content-area > .tab-content");

            tabContents.addClass("dp-none");
            $("#" + selectedTab).removeClass("dp-none");

            $(this).addClass("on").attr('title', '선택됨').siblings().removeClass("on").attr('title', '');
        });
    }

    // 초기 이벤트 바인딩
    bindEvents();

    /*********************************************************************
    팝업 #popup
    *********************************************************************/
    // 레이어팝업 높이 판단하여 block과 position 컨트롤
    function layerFunc(_target) {
        if (!_target.hasClass('laypop-all')) {
            if (_target.outerHeight() > $(window).height()) {
                addBlock('full');
            } else {
                if (_target.attr('id') === "loadingLayer") {
                    addBlock('removeEvent');
                } else if (_target.attr('id') === "customAlertLayer") {
                    addBlock('fixed');
                } else {
                    addBlock();
                }
            }
        } else {
            console.log('Skipping laypop-all class');
        }
    }

    // block 추가 및 삭제
    function addBlock(_full) {

        // close 버튼
        $('.close').on('click', function () {
            $('.block').trigger('click');
        });
    }

    function deleteBlock(_full) {
        if (_full === 'fixed') {
            $('.block').fadeOut(300).remove();
        }
        $('html, .wrap').css({ 'height': '', 'overflow': '' });
        $('body').removeAttr('style');
    }

    function messagePopup(id) {
        const _target = $('#' + id);
        const currentTop = $(window).scrollTop();

        // 스크롤 방지
        $('body').css({ 'position': 'auto'});

        _target.find('.btn-layer-close, .btn-close, .confirm').off('click').on('click', function () {
            closePopup(id, currentTop);

            let isEmptyField = false;

            $('input, textarea, select').each(function () {
                if ($(this).val().trim() === "") {
                    // 포커스 설정
                    $(this).focus();

                    // 포커스된 인풋으로 스크롤 이동
                    let $this = $('input, textarea, select').on('focus', function () {
                        let offset = $(this).offset();
                        console.log('Focused input position:', offset.top, offset.left);
                    });

                    setTimeout(function () {
                        $('html, body').animate({
                            scrollTop: $this.offset().top
                        }, 500);
                    }, 0);

                    isEmptyField = true;
                    return false; // 루프 중지
                }
            });
        });//off('click')추가(기존 이벤트를 제거한 뒤 바인딩)

        _target.fadeIn(600).addClass('on').focus();
    }

    // 팝업 열기 및 닫기
    let scrollPosition = 0;

    function openPopup(id) {
        const $target = $('#' + id);

        // 스크롤 위치 복원 및 스타일 초기화
        $('html').css({ 'overflow': 'hidden'});

        if ($target.length) {

            // 현재 스크롤 위치 저장
            scrollPosition = $(window).scrollTop();

            showPopup($target);
        } else {
            console.error('Target element not found:', id);
        }

        function showPopup($target) {
            layerFunc($target);
            $target.removeClass('close').addClass('on').show().focus();
            // close 버튼
            $target.find('.btn-layer-close, .btn-close, .confirm').on('click', function () {
                closePopup(id);
            });
        }
    }

    function closePopup(id, storedScrollPosition) {
        const $target = $('#' + id);

        deleteBlock();
        $target.fadeOut(200).removeClass('on');

        // 스크롤 위치 복원 및 스타일 초기화
        $('html').css({
            'overflow': '',
        });

        // 스크롤 위치 복원
        if (storedScrollPosition !== undefined) {
            $(window).scrollTop(storedScrollPosition);
        }
    }

    function closePopupUp(id) {
        deleteBlock();
        $('#' + id).scrollTop(0).fadeOut(600);
    }
});
