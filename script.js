angular.module('wallet-app', []).

controller('walletController', function($scope, $rootScope, $timeout) {

  $rootScope.cardIndex = 0;

  $scope.index = function(id) {
    $timeout(function() {
      $rootScope.cardIndex = id;
    }, 1000);
    console.log(id);
  }

  $rootScope.cards = [{
    id: 0,
    cardNumber: '1234 5678 9876 5432',
    expiryDate: '07/19',
    cardHolder: 'J Thomson',
    type: 'visa-curved-64px',
    transactions: [{
      date: '01/02/2016',
      merchant: 'Apple',
      price: '205.25'
    }, {
      date: '05/02/2016',
      merchant: 'Jack & Jones',
      price: '32.95'
    }, {
      date: '12/02/2016',
      merchant: 'F&B',
      price: '47.22'
    }, {
      date: '14/02/2016',
      merchant: 'Swarovski',
      price: '325'
    }]
  }, {
    id: 1,
    cardNumber: '5432 9876 5678 1234',
    expiryDate: '01/22',
    cardHolder: 'T Konten',
    type: 'mastercard-curved-64px',
    transactions: [{
      date: '01/02/2016',
      merchant: 'Hugo Boss',
      price: '19.99'
    }, {
      date: '05/02/2016',
      merchant: 'Amazon UK',
      price: '59.95'
    }]
  }, {
    id: 2,
    cardNumber: '5678 5433 2254 3476',
    expiryDate: '01/22',
    cardHolder: 'C David',
    type: 'discover-curved-64px',
    transactions: [{
      date: '01/02/2016',
      merchant: 'Steam',
      price: '19.99'
    }, {
      date: '05/02/2016',
      merchant: 'Tesco',
      price: '10'
    }, {
      date: '05/02/2016',
      merchant: 'Tesco',
      price: '122.50'
    }, {
      date: '05/02/2016',
      merchant: 'Game',
      price: '22.50'
    }, {
      date: '05/02/2016',
      merchant: 'Steam',
      price: '9'
    }, {
      date: '05/02/2016',
      merchant: 'IKEA',
      price: '12.17'
    }, {
      date: '05/02/2016',
      merchant: 'Apple',
      price: '1.50'
    }, {
      date: '05/02/2016',
      merchant: 'Tesco',
      price: '7.95'
    }]
  }]
}).

controller('addCardController', function($scope, $rootScope, $timeout) {
  $scope.choice = "visa-curved-64px";
  $scope.choose = function(card) {
    $scope.choice = card;
  }
  $scope.number;
  $rootScope.name;
  $scope.expiry;

  $scope.addCard = function(number, name, expiry) {
    $timeout(function() {
      $rootScope.cards.push({
        id: $rootScope.cards.length + 1,
        cardNumber: number,
        cardHolder: name,
        expiryDate: expiry,
        type: $scope.choice,
        transactions: [{
          date: '10/02/2016',
          merchant: 'Jack & Jones',
          price: '79.87'
        }, {
          date: '12/02/2016',
          merchant: 'Cadwalders',
          price: '7.25'
        }, {
          date: '15/02/2016',
          merchant: 'Bella Italia',
          price: '62.70'
        }, {
          date: '15/02/2016',
          merchant: 'Odeon',
          price: '24.99'
        }]
      });
    }, 700);
    console.log($rootScope.cards);
  }
});

function changeCard() {
  setTimeout(function() {
    $("main").find(".list").css({
      'transform': 'scale(0.95)',
      'transition': 'all ease-in-out .45s',
      'opacity': '0',
      '-webkit-filter': 'blur(10px)'
    });
  });
  setTimeout(function() {
    $("main").find(".list").css({
      'transform': 'scale(1)',
      'transition': 'all ease-in-out .45s',
      'opacity': '1',
      '-webkit-filter': 'blur(0)'
    });
  }, 1000);
}

function close() {
  $(".create").css({
    'opacity': '0',
    'pointer-events': 'none'
  });
}

function addCard() {
  $(".create").css({
    'opacity': '1',
    'pointer-events': 'auto'
  })
}

$(".choose_a_card").on("click", "img", function() {
  $(this).addClass("selected").siblings().removeClass("selected");
});

$(".wallet").on("click", ".card", function() {
  changeCard();
  setTimeout(function() {
    close();
  }, 600);
  $(this).css({
    'background': '#EF3E5C',
    'transition': 'all ease .45s'
  }).siblings().css({
    'background': 'rgba(0, 0, 0, 0.2)',
    'transition': 'all ease .45s'
  })
});

$(".add_a_card").click(function() {
  addCard();
});

$("form").find("i").click(function() {
  close();
});

$("input.number").keydown(function(e) {
  if (e.keyCode === 8) {
    $(this).val().length + 100;
  } else if ($(this).val().length === 19) {
    e.preventDefault();
  } else {
    var $this = $(this);
    if ((($this.val().length + 1) % 5) === 0) {
      $this.val($this.val() + " ");
    }
  }
});

$("input.expiry").keydown(function(e) {
  if (e.keyCode === 8) {
    $(this).val().length + 100;
  } else if (e.keyCode === 32) {
    return false;
  } else if (e.keyCode === 191) {
    return false
  } else if (e.keyCode === 189) {
    return false
  } else if ($(this).val().length > 6) {
    e.preventDefault();
  } else {
    var $this = $(this);
    if ((($this.val().length + 1) % 3) === 0) {
      $this.val($this.val() + " / ");
    }
  }
});

$("input[type='submit']").click(function() {
  setTimeout(function() {
    $(".wallet").find(".holder").css({
      'opacity': '0',
      'padding-top': '100px',
      'transition': 'all ease .45s',
    });
  }, 0);
  setTimeout(function() {
    $(".wallet").find(".card").css({
      'transform': 'scale(0)'
    });
  }, 700);
  setTimeout(function() {
    $(".wallet").find(".holder").css({
      'opacity': '1',
      'padding-top': '0',
      'transition': 'all ease .75s',
    });
  }, 1000);
  setTimeout(function() {
    $(".wallet").find(".card").css({
      'transform': 'scale(1)'
    });
  }, 1450);
});